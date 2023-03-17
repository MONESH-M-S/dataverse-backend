// const { ConfidentialClientApplication } = require('@azure/msal-node');
var msal = require('@azure/msal-node');
const { msalConfig } = require('../config/msal.config');

const { SecretClient } = require('@azure/keyvault-secrets');
const { DefaultAzureCredential } = require('@azure/identity');


const fetchKeyVaultData = async (req, res, next) => {

    try {
        const secret = await fetchKeyVaultSecretvalue()

        console.log('Client secret:', secret.value);

        res.json({
            "secret": secret,
            "key_value": secret.value
        })
    } catch (error) {
        next(error)
    }
}

const fetchKeyVaultSecretvalue = async () => {

    const keyVaultName = 'bieno-da08-d-904380-kv01';
    const KVUri = `https://${keyVaultName}.vault.azure.net`;

    const credential = new DefaultAzureCredential();
    const client = new SecretClient(KVUri, credential);

    const keyName = 'svc-b-da-d-904380-ina-aadprincipal';
    const secret = await client.getSecret(keyName);

    console.log('Client secret:', secret.value);

    return secret
}

const fetchAuthToken = async (req, res, next) => {
    try {

        const secret = await fetchKeyVaultSecretvalue()

        msalConfig.auth.clientSecret = secret.value

        const msalInstance = new msal.ConfidentialClientApplication(msalConfig);
        const cryptoProvider = new msal.CryptoProvider();

        // const state = JSON.parse(cryptoProvider.base64Decode(req.body.state));

        // if (state.csrfToken === req.session.csrfToken) {
        // req.session.authCodeRequest.code = req.body.code; // authZ code
        // req.session.authCodeRequest.codeVerifier = req.session.pkceCodes.verifier // PKCE Code Verifier

        try {
            const tokenResponse = await msalInstance.acquireTokenByCode(req.body.code);
            console.log("Token response is ", tokenResponse)
            // req.session.accessToken = tokenResponse.accessToken;
            // req.session.idToken = tokenResponse.idToken;
            // req.session.account = tokenResponse.account;
            // req.session.isAuthenticated = true;

            // console.log("req is ", req)
            res.json({
                token: tokenResponse
            })
            // res.redirect(state.redirectTo);
        } catch (error) {
            next(error);
        }
        // } else {
        //     next(new Error('csrf token does not match'));
        // }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    fetchAuthToken,
    fetchKeyVaultData
}