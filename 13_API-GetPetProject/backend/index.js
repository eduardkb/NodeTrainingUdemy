const express = require("express");
const writeLog = require("./helper/write-log");
const app = express();

//Initialize Middlewares
require("./helper/middlewares").iniMiddlewares(app, express);

// Import Routes
const UserRoutes = require("./routes/userRoutes");
const PetRoutes = require("./routes/petRoutes");
const AdminRoutes = require("./routes/adminRoutes");
const exp = require("constants");
app.use("/users", UserRoutes);
app.use("/pets", PetRoutes);
app.use("/admin", AdminRoutes);

// Initialize Server
try {
  const port = process.env.PORT || 5000;
  app.listen(port);
  writeLog("DEB", "BeServer", `Server started successfully on port ${port}.`);
} catch (error) {
  writeLog("DEB", "BeServer", `Error while starting server: ${error}.`);
}
