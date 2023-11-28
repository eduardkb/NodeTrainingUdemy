const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");
const myModule = require("./myModules/myModule");
const port = 3000;

const app = express();
app.use(express.static("public"));

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
app.use(express.static("public"));

// Base route
app.get("/", (req, res) => {
  res.render("home");
});

// POST Route to submit books
app.post("/books/insertbook", (req, res) => {
  // getting data from submitted form
  const title = req.body.title;
  const pagesqtty = req.body.pagesqtty;
  const price = req.body.price;

  //building query to inster on database
  const sSql = `INSERT INTO books (name, pages, price) VALUES ('${title}', ${pagesqtty}, ${price})`;

  // executing query
  conn.query(sSql, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("COMM_DB: Successfully executed:", sSql);
      res.redirect("/");
    }
  });
});

// Defining MySQL Connection
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodebasicsdb",
});

// Connecting to MySQL
conn.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Success connecting to MySQL!");

    // Create table and data if not exists
    myModule.fCreateTable(conn);
    myModule.fAddSampleData(conn);

    // start app if successfully connected
    fStartServer(app, port);
  }
});

function fStartServer(app, srvPort) {
  app.listen(srvPort, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`SERVER INITIALIZED ON PORT ${srvPort}.`);
    }
  });
}
