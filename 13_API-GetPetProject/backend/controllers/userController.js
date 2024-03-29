const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// import helpers
const writeLog = require("../helper/write-log");
const createUserToken = require("../helper/create-user-token");
const getToken = require("../helper/get-token");
const getUserByToken = require("../helper/get-user-by-token");
const getSecrets = require("../helper/get-secrets");

module.exports = class UserController {
  static async register(req, res) {
    const { name, email, phone, password, confirmpassword } = req.body;

    // validation
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório." });
      return;
    }
    if (!email) {
      res.status(422).json({ message: "O email é obrigatório." });
      return;
    }
    if (!phone) {
      res.status(422).json({ message: "O telefone é obrigatório." });
      return;
    }
    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória." });
      return;
    }
    if (!confirmpassword) {
      res
        .status(422)
        .json({ message: "A Confirmação de senha é obrigatória." });
      return;
    }
    if (password !== confirmpassword) {
      res.status(422).json({
        message: "A senha e a confirmação de senha precisam ser iguais.",
      });
      return;
    }

    // check if user with same email already exists
    try {
      const userExists = await User.findOne({ email: email });
      if (userExists) {
        res.status(422).json({ message: "Este usuário já está cadastrado." });
        return;
      }
    } catch (error) {
      writeLog("DEB", "Db_err", `Error while registering user. Err: ${error}`);
      return res.status(500).json({
        message:
          "Erro ao cadastrar usuario. Favor tentar novamente mais tarde.",
      });
    }

    // crypt user's password
    const salt = await bcrypt.genSalt(12);
    const passHash = await bcrypt.hash(password, salt);

    // create user
    const user = new User({
      name,
      email,
      phone,
      password: passHash,
    });
    try {
      const newUser = await user.save();
      createUserToken(newUser, req, res);
      writeLog("INF", "DbOk", `User saved successfully: ${newUser}`);
    } catch (error) {
      writeLog("DEB", "DbErr", `Error saving user to db: ${error}`);
      res.status(500).json({
        message: "Erro ao salvar usuário. Tente novamente mais tarde",
      });
    }
  }
  static async login(req, res) {
    const { email, password } = req.body;

    // validations
    if (!email) {
      res.status(422).json({ message: "O e-mail é obrigatório." });
      return;
    }
    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória." });
      return;
    }

    // check if user exists
    let user;
    try {
      user = await User.findOne({ email: email });
      if (!user) {
        res.status(404).json({
          message: `Usuário com e-mail '${email}' nao encontrado. Cadastre-se por favor.`,
        });
        return;
      }
    } catch (error) {
      writeLog("DEB", "Db_err", `Error while retreiving user. Err: ${error}`);
      return res.status(500).json({
        message: "Erro ao logar usuario. Favor tentar novamente mais tarde.",
      });
    }

    // check if password matches with DB password
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      res.status(401).json({
        message: `Usuário ou senha incorreta. Tente novamente`,
      });
      return;
    }

    // Successfull login. Generate and send token
    const jwt = await createUserToken(user, req, res);
    writeLog(
      "INF",
      "Login",
      `User logged in and token sent. User: ${user} | Token: ${jwt}`
    );
  }
  static async checkUser(req, res) {
    let currentUser;

    writeLog(
      "DEB",
      "Login",
      `Verify user. Authorization header: ${req.headers.authorization}`
    );

    if (req.headers.authorization) {
      try {
        const token = getToken(req);
        const jwtSecret = await getSecrets("jwtSignature");
        const decoded = jwt.verify(token, jwtSecret);
        writeLog(
          "DEB",
          "TokenOk",
          `Decoded user token: ${JSON.stringify(decoded)}`
        );
        currentUser = await User.findById(decoded.id);
        currentUser.password = undefined;
      } catch (error) {
        writeLog("DEB", "TokenErr", `Error while decoding token": ${error}`);
        currentUser = null;
        return res
          .status(400)
          .send({ message: "Token Inválido. Acesso Negado." });
      }
    } else {
      currentUser = null;
      return res
        .status(500)
        .send({ message: "Token Inválido. Acesso Negado." });
    }
    res.status(200).send(currentUser);
  }
  static async getUserById(req, res) {
    const id = req.params.id;

    try {
      const user = await User.findById(id).select("-password");

      // if user doesn't exist send "catch" error
      if (!user) {
        throw "User not found";
      }

      // if exists return user
      writeLog("DEB", "GetUserById", `User retreived from DB: ${user}`);
      res.status(200).json({ user });
    } catch {
      writeLog(
        "DEB",
        "ErrGetUserById",
        `Error retreivng user with id '${id}' from DB`
      );
      res.status(404).json({
        message: `Usuário nao encontrado.`,
      });
      return;
    }
  }
  static async editUser(req, res) {
    // verify if user exists
    const token = getToken(req);
    const user = await getUserByToken(token, res);
    user.password = undefined;

    // get user properties from request body
    const { name, email, phone, password, confirmpassword } = req.body;

    // getting image if present
    if (req.file) {
      user.image = req.file.filename;
    }

    // user data validation
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório." });
      return;
    }
    if (!email) {
      res.status(422).json({ message: "O email é obrigatório." });
      return;
    }
    if (!phone) {
      res.status(422).json({ message: "O telefone é obrigatório." });
      return;
    }

    // Validation: check if e-mail is already taken if different from user
    const emailExists = await User.findOne({ email: email });
    if (user.email !== email && emailExists) {
      return res.status(422).json({
        message: "Este email já está em uso.",
      });
    }

    // validate passwords if changed
    if (password !== confirmpassword) {
      res.status(422).json({
        message: "A senha e a confirmação de senha precisam ser iguais.",
      });
      return;
    } else if (password != null && password === confirmpassword) {
      // crypt user's password
      const salt = await bcrypt.genSalt(12);
      const passHash = await bcrypt.hash(password, salt);
      user.password = passHash;
    }

    // set new values on user
    user.name = name;
    user.email = email;
    user.phone = phone;

    // Change User data
    try {
      const changedUser = await User.findOneAndUpdate({ _id: user._id }, user, {
        new: true,
      });

      writeLog("DEB", "UpdatingUser", `Data to be written: ${user}`);
      return res.status(200).json({
        message: `Usuário atualizado com sucesso.`,
        changedUser,
      });
    } catch (error) {
      writeLog("DEB", "ErrUpdating", `Err while updating user: ${error}`);
      return res.status(500).json({
        message: `Problema ao cadastrar usuario. Tente novamente mais tarde.`,
      });
    }
  }
  static getUsTest(req, res) {
    try {
      return res.status(200).json({
        message: `Successfully Retreived Users`,
        obs: "Demo hardocded data returned.",
        status: 200,
        users: [
          { name: "Yasmin", age: 22, gender: "Female" },
          { name: "Olaf", age: 33, gender: "Male" },
          { name: "Sonya", age: 44, gender: "Female" },
        ],
      });
    } catch (error) {
      res
        .status(500)
        .json({
          message: `Erro ao consultar dados. Tente novamente mais tarde.`,
        });
    }
  }
  static async createAdmin() {
    try {
      const admUserEmail = process.env.ADMIN_USER || "admin@edu.com";
      // verify if Admin user exists
      const userExists = await User.findOne({ email: admUserEmail });
      if (!userExists) {
        // crypt user's password
        const salt = await bcrypt.genSalt(12);
        const passHash = await bcrypt.hash("admin1234", salt);

        // create user object with admin user properties
        const user = new User({
          name: "Admin",
          email: admUserEmail,
          phone: "+1-000-000-0000",
          password: passHash,
          isAdmin: true,
        });

        // write user to DB
        await user.save();
        writeLog("DEB", "AdminUser", `Admin user created successfully`);
      }
    } catch (error) {
      writeLog("DEB", "AdminUser", `Error while creating Admin ID: ${error}`);
    }
  }
};
