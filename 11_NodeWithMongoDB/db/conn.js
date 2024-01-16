const { MongoClient } = require("mongodb");

const mDb = {
  idName: "eduardkb",
  // PASSWORD HOW TO SET
  // set with command (PowerShell):
  // $> [Environment]::SetEnvironmentVariable("mongoDbPass", "MyPass")
  // set on Cmder or shell
  // $> @set mongoDbPass=MySecretPass
  // on the same shell where the "nmp start" will be run
  idPass: process.env.mongoDbPass,
  // or Direct
  //idPass: "MyPass",
  server: "eduardkb.mongo.cosmos.azure.com",
  port: "10255",
  dbName: "nodeFirstApp",
  params: "?ssl=true&retrywrites=false&maxIdleTimeMS=120000",
};

const params = "?ssl=true&retrywrites=false&maxIdleTimeMS=120000";
const dbName = "nodeFirstApp";
const uri = `mongodb://${mDb.idName}:${mDb.idPass}@${mDb.server}:${mDb.port}/${mDb.dbName}${mDb.params}`;
console.log("--> DEB_DB: Connection string:", uri);
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("--> MSG_INF: Connected to MongoDB.");
  } catch (error) {
    console.log("--> DEB_DB: Error connecting to MongoDB:", error);
  }
}
run();
module.exports = client;
