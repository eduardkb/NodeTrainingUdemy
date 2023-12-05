const Task = require("../models/Task");

module.exports = class TaskController {
  static createTak(req, res) {
    res.render("tasks/create");
  }
};
