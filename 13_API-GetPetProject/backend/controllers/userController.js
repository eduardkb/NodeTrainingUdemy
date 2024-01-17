const User = require("../models/User");
const bcrypt = require("bcrypt");
const fWriteLog = require("../helper/genFunc").fWriteLog;

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
      res.status(201).json({
        message: `Usuário '${email}' registrado com successo.`,
        newUser,
      });
      fWriteLog("INF", "DbOk", `User saved successfully: ${newUser}`);
    } catch (error) {
      fWriteLog("DEB", "DbErr", `Error saving user to db: ${error}`);
      res.status(500).json({
        message: "Erro ao salvar usuário. Tente novamente mais tarde",
      });
    }
  }
};
