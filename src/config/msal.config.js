const msalConfig = {
    tenant: "f66fae02-5d36-495b-bfe0-78a6ff9f8e6e",
    auth: {
        clientId: "01790cf2-7b8b-43d1-aa9a-0b311395bda5", // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
        authority: "https://login.microsoftonline.com/" + "f66fae02-5d36-495b-bfe0-78a6ff9f8e6e", // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
        clientSecret:"secret_data" // Client secret generated from the app registration in Azure portal
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: "Info",
        }
    }
}

const redirectionUrl = "https://bieno-da06-u-904378-webapi-02.azurewebsites.net/auth";
const postLogoutRedirectionurl = "https://bieno-da06-u-904378-webapi-02.azurewebsites.net/auth";
const graphMeEndpoint = "https://graph.microsoft.com" + "v1.0/me";
const scopes = ['User.Read', 'User.Read.All'];
const frontendBaseUrl = "https://bieno-da06-u-904378-webapi-02.azurewebsites.net"

module.exports = {
    msalConfig,
    redirectionUrl,
    postLogoutRedirectionurl,
    graphMeEndpoint,
    scopes,
    frontendBaseUrl
};
