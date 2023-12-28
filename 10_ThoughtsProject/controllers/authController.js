const User = require("../models/User");
const bcrypt = require("bcryptjs");
const utils = require("../helpers/utils");

module.exports = class AuthController {
  static login(req, res) {
    res.render("auth/login");
  }
  static async loginPost(req, res) {
    const { email, password } = req.body;
    utils.fPrintLog(`data from from: |${email}|${password}|`, "WEB");
    // check if user exists
    const user = await User.findOne({ where: { email: email } });
    utils.fPrintLog(`selected user: ${user}`, "DB");
    if (!user) {
      req.flash("message", "User not found.");
      res.render("auth/login");
      return;
    }

    // check his password
    const passMatch = bcrypt.compareSync(password, user.password);
    utils.fPrintLog(`PassMatch: ${passMatch}`, "CONTROL");
    if (!passMatch) {
      req.flash("message", "Password is Invalid.");
      res.render("auth/login");
      return;
    }

    // authenticate user and save session
    req.session.userid = user.id;
    utils.fPrintLog(`User session: ${req.session}`, "AUTH");
    req.flash("message", `Successfully authenticated.`);
    req.session.save(() => {
      res.redirect("/");
    });
  }
  static register(req, res) {
    res.render("auth/register");
  }
  static async registerPost(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    // password match validation
    if (password != confirmPassword) {
      req.flash("message", "The passwords don't match. Try again.");
      res.render("auth/register");
      return;
    }
    if (password.length < 8) {
      req.flash("message", "The password must contain at least 8 digits.");
      res.render("auth/register");
      return;
    }
    // validate if e-mail exists on DB
    const emailExists = await User.findOne({ where: { email: email } });
    if (emailExists) {
      req.flash("message", "This E-mail is already registered.");
      res.render("auth/register");
      return;
    }

    // cypher password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // insert user on DB
    const user = {
      name,
      email,
      password: hashedPassword,
    };

    try {
      const createdUser = await User.create(user);
      utils.fPrintLog(`User created: ${createdUser}`, "DB");

      // authenticate user right after registered
      req.session.userid = createdUser.id;
      utils.fPrintLog(`User Session ID: ${req.session}`, "AUTH");
      req.flash("message", `Successfully registered user: ${name}`);
      req.session.save(() => {
        res.redirect("/");
      });
    } catch (error) {
      utils.fPrintLog(` Error while saving unser to database`, "DB");
      req.flash("message", "Error registering user. Try again later");
    }
  }
  static logout(req, res) {
    req.session.destroy();
    res.redirect("login");
  }
};
