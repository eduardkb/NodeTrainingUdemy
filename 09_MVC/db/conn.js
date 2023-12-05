const Sequelize = require("sequelize");
let sequelize;
const bUseMomoryDbOnly = false;

if (bUseMomoryDbOnly) {
  sequelize = new Sequelize("sqlite::memory:"); //MEMORY ONLY: "sqlite::memory:"
} else {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "db/database.sqlite",
  });
}

try {
  sequelize.authenticate();
  console.log("DB_INF: Successfully Connected");
} catch (error) {
  console.log(`DB_ERR: Not possible to connect to db. Error: ${error}`);
}

exports.default = sequelize;
