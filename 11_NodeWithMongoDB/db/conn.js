const { MongoClient } = require("mongodb");
const uri =
  "mongodb://eduardkb:o1RHi1GByDT7ReKQlsnxhIajdtzTl5LYrsXnvujW2AghS6kaAy7GuR9j1USmWPEfxMvtR5cMNPyWACDbYCVADQ==@eduardkb.mongo.cosmos.azure.com:10255/nodeFirstApp?ssl=true&retrywrites=false&maxIdleTimeMS=120000";
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
