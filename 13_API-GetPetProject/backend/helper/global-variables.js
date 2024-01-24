const client = require("./get-azure-secrets");

module.exports = class globalVar {
  static appName = "GetAPet";

  // if using Azure keyVault
  static jwtSignature = "2D92F4a!5E93DBFF0765e9187&5395EC";
  // static jwtSignature = getSecrets("jwtSignature");
  // dbConnectionString = await client

  // !!! TO-DO TO-DO !!!
  // - change mongoDBPass to mongo db connection string
  // - test new way

  // if using password on code or environment variables
  // static jwtSignature = "2D92F4a!5E93DBFF0765e9187&5395EC";
  // static dbConnectionVariables = {
  //   // PASSWORD HOW TO SET
  //   // set with command (PowerShell):
  //   // $> [Environment]::SetEnvironmentVariable("mongoDbPass", "<MYPASS>")
  //   // set on Cmder or shell
  //   // $> @set mongoDbPass=<MYPASS>
  //   // on the same shell where the "nmp start" will be run
  //   // In Linux:
  //   // $> export mongoDbPass=[variable_value]
  //   // or Directly password here like:
  //   //idPass: "MyPass",

  //   idName: "ekbmongodata",
  //   idPass: process.env.mongoDbPass,
  //   server: "ekbmongodata.mongo.cosmos.azure.com",
  //   port: "10255",
  //   dbName: "nodeGetaPetApp",
  //   params: "?ssl=true&retrywrites=false&maxIdleTimeMS=120000",
  // };
};
