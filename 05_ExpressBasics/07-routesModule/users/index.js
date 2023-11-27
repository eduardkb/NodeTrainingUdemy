const express = require("express");
const router = express.Router();
const path = require("path");
const basePath = path.join(__dirname, "../templates");

// get url to get user data
router.get("/add", (req, res) => {
  console.log(`DEB; ${basePath}`);
  res.sendFile(`${basePath}/userform.html`);
});

// post to print user data
router.post("/save", (req, res) => {
  console.log(req.body);

  const name = req.body.name;
  const age = req.body.age;

  console.log(`Use name ${name}, with age ${age}`);

  res.sendFile(`${basePath}/userform.html`);
});

router.get("/:id", (req, res) => {
  console.log(`DEB2; ${basePath}`);
  const id = req.params.id;
  console.log(`Returning user ${id}`);
  res.sendFile(`${basePath}/users.html`);
});

module.exports = router;
