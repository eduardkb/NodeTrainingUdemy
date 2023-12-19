const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Address = require("../models/Address");

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

  // console.log("DEB_DataToInsert:", req.body);

  // writing to DB with sequelize.create()
  await User.create({ name, occupation, newsletter, age, heigth });

  res.redirect("/");
});

router.get("/list", async (req, res) => {
  const users = await User.findAll({ raw: true }); // raw = true sends data in json format

  // console.log("DEB_GetUsers:", users);

  res.render("listUsers", { users: users });
});

router.post("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await User.destroy({ where: { id: id } });

  res.redirect("/users/list");
});

router.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ include: Address, where: { id: id } });
  // console.log("==> DEB_EditUserGet:", user);
  // console.log("==> DEB_UsrAddresses:", user.Addresses);
  res.render("editUser", { user: user.get({ plain: true }) });
});

router.post("/update", async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const occupation = req.body.occupation;
  const age = req.body.age;
  const heigth = req.body.heigth;
  let newsletter = req.body.newsletter;

  if (newsletter === "on") {
    newsletter = true;
  } else {
    newsletter = false;
  }

  const userData = {
    id,
    name,
    occupation,
    age,
    heigth,
    newsletter,
  };

  await User.update(userData, { where: { id: id } });
  res.redirect("/");
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.render("detailsUser", { id });
});

module.exports = router;
