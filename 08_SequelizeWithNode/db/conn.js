const { Sequelize } = require("sequelize");

var sequelize = new Sequelize(
  "ekb-devnode-sqldbs",
  "eduardkb",
  "Edu@rdkb1701",
  {
    host: "ekb-devnode-sqlsrv.database.windows.net",
    dialect: "mssql",
  }
);

//Conn string from Azure:
// Driver={ODBC Driver 18 for SQL Server};
// Server=tcp:ekb-devnode-sqlsrv.database.windows.net,1433;
// Database=ekb-devnodkb;
// Pwd={your_password_here};
// Encrypt=yes;TrustServerCertificate=no;
// Connection Timeout=30;e-sqldbs;Uid=eduard

try {
  sequelize.authenticate();
  console.log("DB_INFO: Successfully connected to DB");
} catch (error) {
  console.log("DB_ERR: Connection was not possible. ERR:", error);
}
module.exports = sequelize;
