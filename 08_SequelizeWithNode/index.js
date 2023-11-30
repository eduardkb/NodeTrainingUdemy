const express = require("express");
const exphbs = require("express-handlebars");
const conn = require("./db/conn");
const port = 3000;
const app = express();

fInitializeApp();
fAppRoutes();
fInitializeDB();
fStartServer();

//!!!! FUNCTION DEFINITIONS !!!!//

function fInitializeApp() {
  // getting body of submitted form
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(express.json());

  // Initilize handlebars engine
  app.engine(
    "hbs",
    exphbs.engine({
      defaultLayout: "main",
      extname: ".hbs",
      partialsDir: ["views/partials"], //needed for partials
    })
  );
  app.set("view engine", "hbs");

  // initialize public resources
  app.use(express.static("public"));
}

function fInitializeDB() {}

function fStartServer() {
  app.listen(port, (err) => {
    if (err) {
      console.log("Server_INI_ERROR:", err);
    } else {
      console.log(`SERVER INITIALIZED ON PORT ${port}.`);
    }
  });
}

function fAppRoutes() {
  // Base route
  app.get("/", (req, res) => {
    res.render("home");
  });
}
