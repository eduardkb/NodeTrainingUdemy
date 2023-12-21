const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = class AuthController {
  static login(req, res) {
    res.render("auth/login");
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
      console.log("DEB_DB: User created:", createdUser);

      // authenticate user right after registered
      req.session.userid = createdUser.id;
      console.log("DEB_SESSION:", req.session);
      req.flash("message", `Successfully registered user: ${name}`);
      req.session.save(() => {
        res.redirect("/");
      });
    } catch (error) {
      console.log("DEB_DB: Error while saving unser to database");
      req.flash("message", "Error registering user. Try again later");
    }
  }
  static logout(req, res) {
    req.session.destroy();
    res.redirect("login");
  }
};
