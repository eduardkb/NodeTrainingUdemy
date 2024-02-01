const mongoose = require("mongoose");
const writeLog = require("../helper/write-log");
const getSecret = require("../helper/get-secrets");
const userControl = require("../controllers/userController");

async function main() {
  try {
    const sec = await getSecret("dbConnectionString");
    writeLog("DEB", "DbINF", `Connection string: ${sec}`);
    await mongoose.connect(sec);

    writeLog("DEB", "DbINF", `Successfully connected to DB with Mongoose.`);
  } catch (error) {
    writeLog("DEB", "DbERR", `Error. Mongoose couldn't connect: ${error}`);
  }
}
main();

module.exports = mongoose.mongoose;
