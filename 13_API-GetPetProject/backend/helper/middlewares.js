const cors = require("cors");
require("dotenv").config();
const writeLog = require("./write-log");

const iniMiddlewares = (app, express) => {
  // reset log
  writeLog("NEW", "StartRun", `#####################################`);

  // Config JSON response
  app.use(express.json());

  // Configure CORS
  const corsURL = process.env.CORS_URL || `http://localhost:3000`;
  writeLog("DEB", "SetCors", `CORS URL set to: ${corsURL}`);
  app.use(cors({ credentials: true, origin: corsURL }));

  // Public folder
  app.use(express.static("public"));

  // Swagger Initialization
  require("./swagger").swaggerIni(app);
};
module.exports = { iniMiddlewares };
