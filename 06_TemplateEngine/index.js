const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs",
  })
);

app.set("view engine", "hbs");

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.get("/", (req, res) => {
  const user = {
    name: "Eduard",
    surename: "Buhali",
  };
  const produto = "Maçã";
  const auth = true;

  res.render("home", { webData: user, produto, auth });
});

app.listen(3000, () => {
  console.log("The web server has started on port 3000");
});
