const User = require("../models/User");
const Pet = require("../models/Pet");
const writeLog = require("../helper/write-log");

module.exports = class AdminController {
  static async getDbBackup(req, res) {
    try {
      const users = await User.find();
      const pets = await Pet.find();
      const cntUser = users.length;
      const cntPets = pets.length;
      writeLog(
        "INF",
        "GetDb",
        `Admin Backup. \nCount Users: |${cntUser}| \nCount Pets: |${cntPets}|`
      );
      //return all pets and users
      return res.status(200).json({
        message: "Success Retreiving Data.",
        UsersCount: cntUser,
        PetsCount: cntPets,
        Users: users,
        Pets: pets,
      });
    } catch (error) {
      writeLog("DEB", "DbError", `Error reading DB: ${error}`);
      return res
        .status(500)
        .json({ message: `Erro ao ler os dados. Tente Novamente mais tarde.` });
    }
  }
};
