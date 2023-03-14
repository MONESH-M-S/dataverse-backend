const msalConfig = {
    auth: {
        clientId: "6d8fc003-0459-4b44-8e78-937f3d76f009", // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
        authority: "https://login.microsoftonline.com/" + "f66fae02-5d36-495b-bfe0-78a6ff9f8e6e", // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
        clientSecret:"e" // Client secret generated from the app registration in Azure portal
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

const REDIRECT_URI = "http://localhost:3000";
const POST_LOGOUT_REDIRECT_URI = "http://localhost:3000";
const GRAPH_ME_ENDPOINT = "https://graph.microsoft.com" + "v1.0/me";

module.exports = {
    msalConfig,
    REDIRECT_URI,
    POST_LOGOUT_REDIRECT_URI,
    GRAPH_ME_ENDPOINT
};
