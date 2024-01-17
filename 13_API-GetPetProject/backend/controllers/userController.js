const User = require("../models/User");
const bcrypt = require("bcrypt");
const writeLog = require("../helper/write-log").writeLog;
const createUserToken = require("../helper/create-user-token");

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
};
