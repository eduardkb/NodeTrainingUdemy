const { DataTypes } = require("sequelize");
const db = require("../db/conn");

//ID is created automatically
const User = db.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  occupation: {
    type: DataTypes.STRING,
    required: true,
  },
  newsletter: {
    type: DataTypes.BOOLEAN,
    required: true,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  heigth: {
    type: DataTypes.FLOAT,
  },
});

module.exports = User;
