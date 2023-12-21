const express = require("express");
const exphbs = require("express-handlebars");

// Import session controllers
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");

// Import models and db
const Thought = require("./models/Thought");
const User = require("./models/User");
const conn = require("./db/conn");

// Import routes
const thoughtRoutes = require("./routes/thoughtRoutes");
const authRoutes = require("./routes/authRoutes");

// Import Controller
const thoughtController = require("./controllers/thoughtController");
const authController = require("./controllers/authController");

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

  // initialize session middleware
  app.use(
    session({
      name: "session",
      secret: "A$tr0ng$&c43t",
      resave: false,
      saveUninitialized: false,
      store: new FileStore({
        logFn: function () {},
        path: require("path").join(require("os").tmpdir(), " sessions"),
      }),
      cookie: {
        secure: false,
        maxAge: 360000,
        expires: new Date(Date.now() + 360000),
        httpOnly: true,
      },
    })
  );

  // initialize flash messages
  app.use(flash());

  // set session to res
  app.use((req, res, next) => {
    if (req.session.userid) {
      res.locals.session = req.session;
    }
    next();
  });
}

function fInitRoutes() {
  // Base route
  app.get("/", thoughtController.showThoughts);

  // importing routes
  app.use("/thoughts", thoughtRoutes);
  app.use("/", authRoutes);

  // 404 - default route
  app.use((req, res, next) => {
    res.render("404");
  });
}

function fInitDb() {
  conn
    .sync()
    //.sync({ force: true }) // to restart db
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
