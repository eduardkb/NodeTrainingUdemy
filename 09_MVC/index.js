const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const conn = require("./db/conn");
const Task = require("./models/Task");
const port = 3000;

fInitApp();
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
