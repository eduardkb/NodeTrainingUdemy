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
  const arrItems = [
    { name: "Lamp", price: 14.99 },
    { name: "Webcam", price: 154.0 },
    { name: "Headset", price: 899.99 },
  ];
  const objLecture = {
    title: "Node.js Handlers",
    description: "Learn abou handlers in node.js programming language",
    panelist: "John F. Doe",
    cost: 1550,
    location: "Hotel Mabu",
  };

  res.render("home", { webData: user, produto, auth, arrItems, objLecture });
});

app.listen(3000, () => {
  console.log("The web server has started on port 3000");
});
