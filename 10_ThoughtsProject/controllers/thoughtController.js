const Thought = require("../models/Thought");
const User = require("../models/User");
const utils = require("../helpers/utils");
const session = require("express-session");
const { Op } = require("sequelize");

module.exports = class ThoughtController {
  static async showThoughts(req, res) {
    let search = "";
    if (req.query.search) {
      search = req.query.search;
    }
    utils.fPrintLog(`Search value: ${search}`, "LOGIC");
    const data = await Thought.findAll({
      include: User,
      where: {
        title: { [Op.like]: `%${search}%` },
      },
    });
    const thoughts = data.map((result) => result.get({ plain: true }));
    let thQty = thoughts.length;
    if (thQty === 0) {
      thQty = false;
    }
    res.render("thoughts/home", { thoughts, search, thQty });
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

    let bEmptyThoughts = false;
    if (thoughts.length === 0) {
      bEmptyThoughts = true;
    }
    res.render("thoughts/dashboard", { thoughts, bEmptyThoughts });
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
      req.session.save(() => {
        res.redirect("/thoughts/dashboard");
      });
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
  static async removeThought(req, res) {
    const id = req.body.id;
    const userId = req.session.userid;
    try {
      await Thought.destroy({ where: { id: id, userId: userId } });

      req.flash("message", "Thougth deleted successfully.");
    } catch (error) {
      req.flash(
        "message",
        "Error deleting Thougth. Try again later. ERR:",
        error
      );
    }
    req.session.save(() => {
      res.redirect("/thoughts/dashboard");
    });
  }
  static async updateThought(req, res) {
    const id = req.params.id;
    const thought = await Thought.findOne({ where: { id: id }, raw: true });
    res.render("thoughts/edit", { thought });
  }
  static async updateThoughtSave(req, res) {
    const id = req.body.id;
    const thought = {
      title: req.body.title,
    };
    try {
      await Thought.update(thought, { where: { id: id } });
      req.flash("message", "Thougth updated successfully.");
    } catch (error) {
      req.flash(
        "message",
        "Error while updateding thought. Try again later. ",
        error
      );
    }

    req.session.save(() => {
      res.redirect("/thoughts/dashboard");
    });
  }
};
