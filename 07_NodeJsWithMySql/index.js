const express = require("express");
const exphbs = require("express-handlebars");
const pool = require("./db/conn");
const myModule = require("./myModules/myModule");
const path = require("path");
const port = 3000;
const app = express();

fInitializeApp();
fBookRoutes();
fInitializeDB();
fStartServer();

// FUNCTION DEFINITIONS //

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

function fInitializeDB() {
  // Create table and data if not exists
  myModule.fCreateTable(pool);
  myModule.fAddSampleData(pool);

  // Not used anymore. New database connection on /db/conn.js
  // conn = mysql.createConnection({ // define DB parameters
  //   host: "localhost",
  //   user: "root",
  //   password: "",
  //   database: "nodebasicsdb",
  // });

  // // Connecting to MySQL
  // conn.connect((err) => {
  //   if (err) {
  //     console.log("DB_CONN:", err);
  //   } else {
  //     console.log("Success connecting to MySQL!");

  //     // start app if successfully connected
  //     fStartServer(app, port);
  //   }
  // });
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

function fBookRoutes() {
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
    const sSql = `INSERT INTO books (name, pages, price) VALUES (?,?,?)`;
    const data = [title, pagesqtty, price];

    // executing query
    pool.query(sSql, data, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("COMM_DB: Successfully executed:", sSql);
        res.redirect("/books");
      }
    });
  });

  // GET - List all books
  app.get("/books", (req, res) => {
    const sSql = "SELECT * FROM books";
    pool.query(sSql, (err, data) => {
      if (err) {
        console.log(err);
        return;
      } else {
        const books = data;
        res.render("books", { books });
      }
    });
  });
  // GET - Print details about one book
  app.get("/books/:id", (req, res) => {
    const id = req.params.id;

    const sSql = `SELECT * FROM books WHERE id = ?`;
    const data = [id];
    pool.query(sSql, data, (err, data) => {
      if (err) {
        console.log("SQL_ERR:", err);
      } else {
        const book = data[0];
        res.render("book", { book });
      }
    });
  });

  // GET - To get details prepared for update
  app.get("/books/edit/:id", (req, res) => {
    const id = req.params.id;
    const sSql = `SELECT * fROM books WHERE id = ?`;
    const data = [id];
    pool.query(sSql, data, (err, data) => {
      if (err) {
        console.log("SQL_ERR:", err);
      } else {
        const book = data[0];
        res.render("editbook", { book });
      }
    });
  });

  // POST - to update the book
  app.post("/books/updatebook", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const pages = req.body.pages;
    const price = req.body.price;

    // console.log("DEB_VAL_UPDATE: %s|%s|%s|%s", id, name, pages, price);

    const sSql = "UPDATE books SET name = ?, pages = ?, price = ? WHERE id = ?";
    const data = [name, pages, price, id];
    pool.query(sSql, data, (err) => {
      if (err) {
        console.log("SQL_ERR:", err);
      } else {
        res.redirect("/books");
      }
    });
  });

  // POST - to delete a book
  app.post("/books/remove/:id", (req, res) => {
    const id = req.params.id;
    const sSql = `DELETE FROM books WHERE id = ?`;
    const data = [id];
    pool.query(sSql, data, (err) => {
      if (err) {
        console.log("SQL_ERR:", err);
      } else {
        res.redirect("/books");
      }
    });
  });
}
