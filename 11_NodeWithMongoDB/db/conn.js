const { MongoClient } = require("mongodb");
const pass = "connPass";
const params = "?ssl=true&retrywrites=false&maxIdleTimeMS=120000";
const dbName = "nodeFirstApp";
const uri = `mongodb://eduardkb:${pass}@eduardkb.mongo.cosmos.azure.com:10255/${dbName}${params}`;
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
