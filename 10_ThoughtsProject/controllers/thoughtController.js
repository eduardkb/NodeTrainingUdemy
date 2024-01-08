const Thought = require("../models/Thought");
const User = require("../models/User");
const utils = require("../helpers/utils");

module.exports = class ThoughtController {
  static async showThoughts(req, res) {
    res.render("thoughts/home");
  }
  static async dashboard(req, res) {
    const userId = req.session.userid;
    const user = await User.findOne({
      where: { id: userId },
      include: Thought, // already get all user's thoughts
      plain: true,
    });

    // if user does not exist redirect to login
    if (!user) {
      res.redirect("/login");
    }

    // use map function to extract only thoughts
    // from returned DB values
    const thoughts = user.Thoughts.map((result) => result.dataValues);
    console.log("DEB:", thoughts);

    res.render("thoughts/dashboard", { thoughts });
  }
  static createThought(req, res) {
    res.render("thoughts/create");
  }
  static async postThought(req, res) {
    const title = req.body.title;
    const UserId = req.session.userid;

    utils.fPrintLog(`Data for DB add: |${title}|${UserId}|`, "DB");

    if (title.length <= 5) {
      req.flash("message", "Type more than 5 characters for the thougth.");
      res.render("thoughts/create");
      return;
    }

    const thougth = {
      title,
      UserId,
    };

    try {
      await Thought.create(thougth);
      req.flash("message", "Thougth successfully added.");
      res.render("thoughts/dashboard");
    } catch (error) {
      utils.fPrintLog(`Error while saving thougth to database`, "DB");
      req.flash(
        "message",
        "Error registering Thougth. Try again later. ERR:",
        error
      );
      res.render("thoughts/create");
    }
  }
};
