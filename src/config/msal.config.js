const msal = require("@azure/msal-node");

const msalConfig = {
    tenant: process.env.TENENT_ID,
    auth: {
        clientId: process.env.CLIENT_ID, // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
        authority: `https://login.microsoftonline.com/${process.env.TENENT_ID}`, // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
        clientSecret:process.env.CLIENT_SECRET // Client secret generated from the app registration in Azure portal
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Verbose,
        }
    }
}

const cca = new msal.ConfidentialClientApplication(msalConfig);
const scopes = [`api://${process.env.CLIENT_ID}/api.readwrite`];

const redirectionUrl = "https://bieno-da08-d-904380-webapi-02.azurewebsites.net/auth";
const postLogoutRedirectionurl = "https://bieno-da08-d-904380-webapi-02.azurewebsites.net/auth";
const graphMeEndpoint = "https://graph.microsoft.com" + "v1.0/me";
const frontendBaseUrl = "https://bieno-da08-d-904380-webapi-02.azurewebsites.net"

module.exports = {
    redirectionUrl,
    postLogoutRedirectionurl,
    graphMeEndpoint,
    scopes,
    frontendBaseUrl,
    cca
};
