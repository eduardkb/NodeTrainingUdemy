const mongoose = require("mongoose");
const fWriteLog = require("../helper/genFunc").fWriteLog;

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
fWriteLog("DEB", "DB_INF", `Connection string: ${uri}`);

async function main() {
  try {
    await mongoose.connect(uri);
    fWriteLog("DEB", "DB_INF", `Successfully connected to DB with Mongoose.`);
  } catch (error) {
    fWriteLog("DEB", "DB_ERR", `Error. Mongoose couldn't connect: ${error}`);
  }
}
main();
module.exports = mongoose.mongoose;
