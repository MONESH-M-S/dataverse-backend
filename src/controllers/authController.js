const { ConfidentialClientApplication } = require('@azure/msal-node');
const { msalConfig, redirectionUrl, scopes, postLoginRedirectionUrl } = require('../config/msal.config');

const { SecretClient } = require('@azure/keyvault-secrets');
const { DefaultAzureCredential } = require('@azure/identity');

const fetchKeyVaultSecretvalue = async () => {

    const keyVaultName = 'bieno-da08-d-904380-kv01';
    const KVUri = `https://${keyVaultName}.vault.azure.net`;

    const credential = new DefaultAzureCredential();
    const client = new SecretClient(KVUri, credential);

    const keyName = 'svc-b-da-d-904380-ina-aadprincipal';
    const secret = await client.getSecret(keyName);

    return secret
}

const fetchAuthToken = async (req, res, next) => {
    try {

        const secret = await fetchKeyVaultSecretvalue()

        msalConfig.auth.clientSecret = secret.value

        const msalInstance = new ConfidentialClientApplication(msalConfig);

        const code = req.query.code

        try {
            const tokenResponse = await msalInstance.acquireTokenByCode({
                code: code,
                redirectUri: redirectionUrl,
                scopes: scopes
            });

            res.cookie('authToken', tokenResponse.accessToken);

            res.redirect('/home')

        } catch (error) {
            next(error);
        }
    } catch (error) {
        next(error)
    }
}

const generateAuthToken = async (req, res, next) => {

    try {
        const secret = await fetchKeyVaultSecretvalue()

        msalConfig.auth.clientSecret = secret.value

        const cca = new ConfidentialClientApplication(msalConfig);
        const authCodeUrlParameters = {
            scopes,
            redirectUri: redirectionUrl
        };

        const authUrl = await cca.getAuthCodeUrl(authCodeUrlParameters);
        res.redirect(authUrl);

    } catch (error) {
        next(error)
    }

}

module.exports = {
    fetchAuthToken,
    generateAuthToken
}