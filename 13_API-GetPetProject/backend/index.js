const express = require("express");
const cors = require("cors");
const fWriteLog = require("./helper/genFunc").fWriteLog;
const port = 5000;
const app = express();

// Config JSON response
app.use(express.json());

// Configure CORS
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Public folder
app.use(express.static("public"));

// Routes

// Initialize Server

try {
  app.listen(port);
  fWriteLog("DEB", "BeServer", `Server started successfully on port ${port}.`);
} catch (error) {
  fWriteLog("DEB", "BeServer", `Error while starting server: ${error}.`);
}
