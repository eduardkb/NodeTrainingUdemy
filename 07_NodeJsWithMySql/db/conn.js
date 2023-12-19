const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10, // maximum number of connections
  host: "localhost",
  user: "root",
  password: "",
  database: "nodebasicsdb",
});

module.exports = pool;
