const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require('session-file-store')(session);
const flas = require('express-flash');
const conn = require('./db/conn')

const port = 3000;
const app = express();

fInitApp();
fInitRoutes();
fInitDb();

function fInitApp() {
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

function fInitRoutes() {
  // Base route
  app.get("/", (req, res) => {
    res.render("iniTest");
  });

  // importing routes
  // app.use("/tasks", tasksRoutes);

  // If user types an invalid URL
  // is only executed if not in any path above
  // 404 - page does not exist
  app.use((req, res, next) => {
    res.render("404");
  });
}

function fInitDb() {
  conn
    .sync()
    .then(fStartServer())
    .catch((err) => console.log("DB_ERR: %s", err));
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
