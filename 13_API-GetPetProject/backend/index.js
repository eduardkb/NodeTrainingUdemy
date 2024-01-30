const express = require("express");
const cors = require("cors");
const writeLog = require("./helper/write-log");
const app = express();

// reset log
writeLog("NEW", "StartRun", `#####################################`);

// Config JSON response
app.use(express.json());

// Configure CORS
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Public folder
app.use(express.static("public"));

// Imported Routes
const UserRoutes = require("./routes/userRoutes");
const PetRoutes = require("./routes/petRoutes");
const AdminRoutes = require("./routes/adminRoutes");
app.use("/users", UserRoutes);
app.use("/pets", PetRoutes);
app.use("/admin", AdminRoutes);

// 404 - default route
app.use((req, res, next) => {
  res.status(200).json({
    message: "Welcome to the 'Get a Pet' API.",
  });
});

// Initialize Server
try {
  const port = process.env.PORT || 5000;
  app.listen(port);
  writeLog("DEB", "BeServer", `Server started successfully on port ${port}.`);
  writeLog("DEB", "BeServer", `Access: https://localhost:${port}/`);
} catch (error) {
  writeLog("DEB", "BeServer", `Error while starting server: ${error}.`);
}
