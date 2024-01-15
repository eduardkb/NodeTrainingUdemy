const express = require("express");
const exphbs = require("express-handlebars");

const port = 3000;
const app = express();

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

app.use(express.json());

app.listen(port, (err) => {
  if (err) {
    console.log("--> MSG_ERR: Server initialization problem:", err);
  } else {
    console.log(`--> MSG_INF: Server running on port: ${port}.`);
  }
});
