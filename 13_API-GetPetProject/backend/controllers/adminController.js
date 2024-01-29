const User = require("../models/User");
const Pet = require("../models/Pet");
const writeLog = require("../helper/write-log");

module.exports = class AdminController {
  static async getDbBackup(req, res) {
    try {
      const users = await User.find();
      const pets = await Pet.find();
      writeLog("INF", "GetDb", `All Users: |${users}| \nAll Pets: |${pets}|`);
      //return all pets and users
      return res.status(200).json({
        message: "Success Retreiving Data.",
        AllUsers: users,
        AllPets: pets,
      });
    } catch (error) {
      writeLog("DEB", "DbError", `Error reading DB: ${error}`);
      return res
        .status(500)
        .json({ message: `Erro ao ler os dados. Err: ${error}` });
    }
  }
};
