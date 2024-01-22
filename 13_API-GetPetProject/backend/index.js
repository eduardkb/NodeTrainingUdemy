const express = require("express");
const cors = require("cors");
const writeLog = require("./helper/write-log");
const port = 5000;
const app = express();

// Config JSON response
app.use(express.json());

// Configure CORS
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Public folder
app.use(express.static("public"));

// Routes
const UserRoutes = require("./routes/userRoutes");
const PetRoutes = require("./routes/petRoutes");
const AdminRoutes = require("./routes/adminRoutes");
app.use("/users", UserRoutes);
app.use("/pets", PetRoutes);
app.use("/admin", AdminRoutes);

// Initialize Server
try {
  app.listen(port);
  writeLog("DEB", "BeServer", `Server started successfully on port ${port}.`);
} catch (error) {
  writeLog("DEB", "BeServer", `Error while starting server: ${error}.`);
}
