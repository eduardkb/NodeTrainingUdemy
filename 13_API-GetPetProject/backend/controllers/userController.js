const User = require("../models/User");

module.exports = class UserController {
  static async register(req, res) {
    res.json("Olá do app Get a Pet");
  }
};
