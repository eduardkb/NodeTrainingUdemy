const express = require("express");
const app = express();
const port = 3000;

const path = require("path");
const basePath = path.join(__dirname, "templates");

// very simple middleware
// checks if user is authenticated or not.
const checkAuth = function (req, res, next) {
  req.authStatus = true;
  if (req.authStatus) {
    console.log("User is logged in.");
    next();
  } else {
    console.log("User is not logged in. Please login ");
    next();
  }
};

app.use(checkAuth);

app.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

app.get("/products", (req, res) => {
  res.sendFile(`${basePath}/product.html`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
