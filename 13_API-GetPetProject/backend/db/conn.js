const mongoose = require("mongoose");
const writeLog = require("../helper/write-log");

const mDb = {
  // PASSWORD HOW TO SET
  // set with command (PowerShell):
  // $> [Environment]::SetEnvironmentVariable("mongoDbPass", "<MYPASS>")
  // set on Cmder or shell
  // $> @set mongoDbPass=<MYPASS>
  // on the same shell where the "nmp start" will be run
  // or Direct like:
  //idPass: "MyPass",

  idName: "ekbmongodata",
  idPass: process.env.mongoDbPass,
  server: "ekbmongodata.mongo.cosmos.azure.com",
  port: "10255",
  dbName: "nodeGetaPetApp",
  params: "?ssl=true&retrywrites=false&maxIdleTimeMS=120000",
};

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
