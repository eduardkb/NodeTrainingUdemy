const { MongoClient } = require("mongodb");

const mDb = {
  // PASSWORD HOW TO SET
  // set with command (PowerShell):
  // $> [Environment]::SetEnvironmentVariable("mongoDbPass", "MyPass")
  // set on Cmder or shell
  // $> @set mongoDbPass=lGNARyucnH5NI3ARZXoVnArsu0ql5ucfQeIlsCjzmnDes0PoCsvk8BMgO9pvjbpUaW0Gm0hGpxiOACDbcbSNuQ==
  // on the same shell where the "nmp start" will be run
  // or Direct like:
  //idPass: "MyPass",

  idName: "ekbmongodata",
  idPass: process.env.mongoDbPass,
  pass: "lGNARyucnH5NI3ARZXoVnArsu0ql5ucfQeIlsCjzmnDes0PoCsvk8BMgO9pvjbpUaW0Gm0hGpxiOACDbcbSNuQ==",
  server: "ekbmongodata.mongo.cosmos.azure.com",
  port: "10255",
  dbName: "nodeProductsApp",
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
