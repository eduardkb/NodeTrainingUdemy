const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hi, World.");
});

app.get("/products", (req, res) => {
  res.send("Products page.");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
