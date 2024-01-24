require("dotenv").config();
const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");

const writeLog = require("./write-log");

const getSecrets = async (name) => {
  writeLog(
    "Deb",
    "EnvVars",
    `Values from environment variables |${process.env.KEYVAULT_URI}|${process.env.AZURE_TENANT_ID}|${process.env.AZURE_CLIENT_ID}|${process.env.AZURE_CLIENT_SECRET}|`
  );

  try {
    const credential = new DefaultAzureCredential();
    const client = new SecretClient(process.env.KEYVAULT_URI, credential);
    const secret = await client.getSecret(name);
    writeLog("DEB", "Secret", `"${name}" Secret retreived: ${secret.value}`);
    return secret.value;
  } catch (error) {
    throw "Error gettign secrets from KV.";
  }
};

module.exports = getSecrets;
