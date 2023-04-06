const msal = require("@azure/msal-node");

const msalConfig = {
    tenant: "f66fae02-5d36-495b-bfe0-78a6ff9f8e6e",
    auth: {
        clientId: "6d8fc003-0459-4b44-8e78-937f3d76f009", // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
        authority: "https://login.microsoftonline.com/f66fae02-5d36-495b-bfe0-78a6ff9f8e6e", // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
        clientSecret:"Y5t8Q~YWA1s9sT6ToOqA1NH3aVLhZoBIfG4RMaaz" // Client secret generated from the app registration in Azure portal
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
const scopes = ['api://6d8fc003-0459-4b44-8e78-937f3d76f009/api.readwrite'];

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
