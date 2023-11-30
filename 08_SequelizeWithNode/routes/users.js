const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/add", (req, res) => {
  //res.sendFile(`/userform.html`);
  res.render("addUsers");
});

router.post("/create", async (req, res) => {
  const name = req.body.name;
  const occupation = req.body.occupation;
  let newsletter = req.body.newsletter;
  const age = req.body.age;
  const heigth = req.body.heigth;

  // validating newsletter
  newsletter === "on" ? (newsletter = true) : (newsletter = false);

  console.log("DEB_DataToInsert:", req.body);

  // writing to DB with sequelize.create()
  await User.create({ name, occupation, newsletter, age, heigth });

  res.redirect("/");
});

router.get("/list", async (req, res) => {
  const users = await User.findAll({ raw: true }); // raw = true sends data in json format

  console.log("DEB_GetUsers:", users);

  res.render("listUsers", { users: users });
});
module.exports = router;
