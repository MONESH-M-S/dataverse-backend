const msal = require("@azure/msal-node");
const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");
const env = process.env.APP_ENVIRONMENT;

async function getClientSecret() {
  try {
    const keyVaultName = process.env.KEY_VAULT_NAME;
    const secretName = process.env.KEY_VAULT_SECRET_NAME;
    const url = `https://${keyVaultName}.vault.azure.net`;

    const credential = new DefaultAzureCredential();
    const client = new SecretClient(url, credential);
    const secret = await client.getSecret(secretName);
    return secret.value;
  } catch (error) {
    console.log(error);
  }
}

async function initalize() {

  const msalConfig = {
    tenant: process.env.TENENT_ID,
    auth: {
      clientId: process.env.CLIENT_ID, // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
      authority: `https://login.microsoftonline.com/${process.env.TENENT_ID}`, // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
      clientSecret: env ? await getClientSecret() : process.env.CLIENT_SECRET, // Fetch client secret when env is not undefined
      // clientSecret: process.env.CLIENT_SECRET,
    },
    system: {
      loggerOptions: {
        loggerCallback(loglevel, message, containsPii) {
          console.log(message);
        },
        piiLoggingEnabled: false,
        logLevel: msal.LogLevel.Verbose,
      },
    },
  };

  const cca = new msal.ConfidentialClientApplication(msalConfig);
  return cca;
}

const scopes = [`api://${process.env.CLIENT_ID}/api.readwrite`];

const frontendUrl = process.env.FRONTEND_URL;
const redirectionUrl = frontendUrl + "/auth";
const postLogoutRedirectionurl = frontendUrl + "/auth";
const graphMeEndpoint = "https://graph.microsoft.com" + "v1.0/me";
const frontendBaseUrl = frontendUrl;

module.exports = {
  redirectionUrl,
  postLogoutRedirectionurl,
  graphMeEndpoint,
  scopes,
  frontendBaseUrl,
  cca: initalize(),
};
