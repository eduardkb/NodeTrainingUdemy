const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// import helpers
const writeLog = require("../helper/write-log");
const createUserToken = require("../helper/create-user-token");
const getToken = require("../helper/get-token");
const jwtSignature = require("../helper/global-variables").jwtSignature;
const getUserByToken = require("../helper/get-user-by-token");

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
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(422).json({ message: "Este usuário já está cadastrado." });
      return;
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
      // res.status(201).json({
      //   message: `Usuário '${email}' registrado com successo.`,
      //   newUser,
      // });
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
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json({
        message: `Usuário com e-mail '${email}' nao encontrado. Cadastre-se por favor.`,
      });
      return;
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
        const decoded = jwt.verify(token, jwtSignature);
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
      }
    } else {
      currentUser = null;
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
    // get user id
    const id = req.params.id;

    // verify if user exists
    const token = getToken(req);
    const user = await getUserByToken(token);
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
  }
};
