require("dotenv").config();
const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");
const writeLog = require("./write-log");

const getSecrets = async (name) => {
  // verify .env file
  let bSecretsFromAzure = process.env.GET_SECRETS_FROM_AZURE;

  if (!bSecretsFromAzure) {
    throw 'No ".env" file to read variables from';
  } else {
    bSecretsFromAzure === "true"
      ? (bSecretsFromAzure = true)
      : (bSecretsFromAzure = false);
  }

  // if not getting secrets from azure
  if (!bSecretsFromAzure) {
    writeLog("DEB", "EnvVars", `Using secrets from local .env file`);
    // secret names getting retreived
    // jwtSignature
    // dbConnectionString
    writeLog(
      "Deb",
      "EnvVars",
      `Values from environment variables |${process.env.LOCAL_JWT_SIGNATURE}|${process.env.LOCAL_DB_CONNECTION_STRING}|`
    );

    let sRet = "";
    if (name === "jwtSignature") {
      sRet = process.env.LOCAL_JWT_SIGNATURE;
    } else if (name === "dbConnectionString") {
      sRet = process.env.LOCAL_DB_CONNECTION_STRING;
    }
    writeLog("DEB", "Secrets", `Returned key ${name} with value ${sRet}`);
    return sRet;
  } else {
    // if getting secrets from Azure KeyVault
    writeLog("DEB", "EnvVars", `Using secrets from Azure KeyVault`);
    writeLog(
      "Deb",
      "EnvVars",
      `Values from environment variables |${process.env.KEYVAULT_URI}|${process.env.AZURE_TENANT_ID}|${process.env.AZURE_CLIENT_ID}|${process.env.AZURE_CLIENT_SECRET}|`
    );

    try {
      const credential = new DefaultAzureCredential();
      const client = new SecretClient(process.env.KEYVAULT_URI, credential);
      const secret = await client.getSecret(name);
      writeLog(
        "DEB",
        "Secret",
        `Ázure key "${name}" Secret retreived: ${secret.value}`
      );
      return secret.value;
    } catch (error) {
      throw `Error getting secrets from KV. ERR CODE: ${error}`;
    }
  }
};

module.exports = getSecrets;
