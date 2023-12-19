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

// import user routes
app.use("/users", userRoutes);

// main route
app.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

// initialize listener
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
