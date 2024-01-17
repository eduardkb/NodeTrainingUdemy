module.exports = class globalVar {
  static appName = "GetAPet";
  static jwtSignature = "MyC.mp1&xS&cr3t.1701";
  static dbConnectionVariables = {
    // PASSWORD HOW TO SET
    // set with command (PowerShell):
    // $> [Environment]::SetEnvironmentVariable("mongoDbPass", "<MYPASS>")
    // set on Cmder or shell
    // $> @set mongoDbPass=<MYPASS>
    // on the same shell where the "nmp start" will be run
    // or Directle password here like:
    //idPass: "MyPass",

    idName: "ekbmongodata",
    idPass: process.env.mongoDbPass,
    server: "ekbmongodata.mongo.cosmos.azure.com",
    port: "10255",
    dbName: "nodeGetaPetApp",
    params: "?ssl=true&retrywrites=false&maxIdleTimeMS=120000",
  };
};
