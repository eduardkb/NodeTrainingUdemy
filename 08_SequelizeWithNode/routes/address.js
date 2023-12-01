const express = require("express");
const router = express.Router();
const User = require("../models/Address");
const Address = require("../models/Address");

router.post("/create", async (req, res) => {
  const UserId = req.body.UserId;
  const street = req.body.street;
  const number = req.body.number;
  const city = req.body.city;

  const address = { UserId, street, number, city };

  console.log("DB_AddressAdd:", address);

  await Address.create(address);

  res.redirect(`/users/edit/${UserId}`);
});

module.exports = router;
