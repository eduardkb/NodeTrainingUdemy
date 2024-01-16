const mongoose = require("mongoose");

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
  pass: "<MYPASS>",
  server: "ekbmongodata.mongo.cosmos.azure.com",
  port: "10255",
  dbName: "nodeMongooseApp",
  params: "?ssl=true&retrywrites=false&maxIdleTimeMS=120000",
};

const uri = `mongodb://${mDb.idName}:${mDb.idPass}@${mDb.server}:${mDb.port}/${mDb.dbName}${mDb.params}`;
console.log("--> DEB_DB: Connection string:", uri);

async function main() {
  try {
    await mongoose.connect(uri);
    console.log("--> MSG_INF: Connected to MongoDB with Mongoose.");
  } catch (error) {
    console.log("--> DEB_DB: Error. Mongoose couldn't connect:", error);
  }
}
main();
module.exports = mongoose.mongoose;
