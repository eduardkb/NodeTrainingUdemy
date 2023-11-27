const express = require("express");
const path = require("path");
const router = express.Router();
const app = express();
const port = 3000;
const userRoutes = require("./users");

// read body
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
const basePath = path.join(__dirname, "templates");

//static files
app.use(express.static("public"));

// import user routes
app.use("/users", userRoutes);

// main route
app.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

// If user types an invalid URL
// is only executed if not in any path above
// 404 - page does not exist
app.use((req, res, next) => {
  res.status(404).sendFile(`${basePath}/404.html`);
});

// initialize listener
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
