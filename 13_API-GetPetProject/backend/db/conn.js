const mongoose = require("mongoose");
const writeLog = require("../helper/write-log");
const mDb = require("../helper/global-variables").dbConnectionVariables;

const uri = `mongodb://${mDb.idName}:${mDb.idPass}@${mDb.server}:${mDb.port}/${mDb.dbName}${mDb.params}`;
writeLog("DEB", "DbINF", `Connection string: ${uri}`);

async function main() {
  try {
    await mongoose.connect(uri);
    writeLog("DEB", "DbINF", `Successfully connected to DB with Mongoose.`);
  } catch (error) {
    writeLog("DEB", "DbERR", `Error. Mongoose couldn't connect: ${error}`);
  }
}
main();
module.exports = mongoose.mongoose;
