const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/add", (req, res) => {
  //res.sendFile(`/userform.html`);
  res.render("addUsers");
});

router.post("/create", (req, res) => {
  const name = req.body.name;
  const occupation = req.body.occupation;
  let newsletter = req.body.newsletter;
  const age = req.body.age;
  const heigth = req.body.heigth;

  // validating newsletter
  newsletter === "on" ? (newsletter = true) : (newsletter = false);

  // writing to DB with sequelize.create()
  (async () => {
    await User.create({ name, occupation, newsletter, age, heigth });
    console.log("DB_INFO: Data inserted.");
  })();

  res.redirect("/");
});

module.exports = router;
