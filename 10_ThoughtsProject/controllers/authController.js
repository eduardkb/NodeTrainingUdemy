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

    //password match validation
    if (password != confirmPassword) {
      req.flash("message", "The passwords don't match. Try again.");
      res.render("auth/register");
      return;
    }

    res.render("home");
  }
};
