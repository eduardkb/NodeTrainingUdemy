const express = require("express");
const exphbs = require("express-handlebars");
const conn = require("./db/conn");
const User = require("./models/User");
const port = 3000;
const app = express();

fInitializeApp();
fAppRoutes();
// Init DB and start server if DB Initialized
fInitDB();

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

function fInitDB() {
  conn
    .sync()
    .then(() => {
      fStartServer();
    })
    .catch((err) => console.log("DB_ERR: Error syncing DB. ERR:", err));
}

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

  // If user types an invalid URL
  // is only executed if not in any path above
  // 404 - page does not exist
  app.use((req, res, next) => {
    res.render("404");
  });
}
