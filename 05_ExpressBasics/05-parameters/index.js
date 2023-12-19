const express = require("express");
const app = express();
const port = 3000;

const path = require("path");
const basePath = path.join(__dirname, "templates");

app.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

// create a url with parameter and getting the param. value
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  console.log(`Returning user ${id}`);
  res.sendFile(`${basePath}/users.html`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
