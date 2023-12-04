const Sequelize = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

try {
  sequelize.authenticate();
  console.log("DB_INF: Successfully Connected");
} catch (error) {
  console.log(`DB_ERR: Not possible to connect to db. Error: ${error}`);
}

exports.default = sequelize;
