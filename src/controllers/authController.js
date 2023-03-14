// const { ConfidentialClientApplication } = require('@azure/msal-node');
var msal = require('@azure/msal-node');
const { msalConfig } = require('../config/msal.config');

const { SecretClient } = require('@azure/keyvault-secrets');
const { DefaultAzureCredential } = require('@azure/identity');


const fetchKeyValutData = async (req, res, next) => {

    try {
        console.log("Inside key vault method")
        const keyVaultName = 'bnlwe-da02-b-902592-kv01';
        const KVUri = `https://${keyVaultName}.vault.azure.net`;

        const credential = new DefaultAzureCredential();
        const client = new SecretClient(KVUri, credential);

        // const secretName = 'BLOB-CONTAINER-PATH';
        // const secretName = 'dfd315a8-2e37-4018-aac4-014a4d078746';
        const secretName = 'f66fae02-5d36-495b-bfe0-78a6ff9f8e6e';
        const secret = await client.getSecret(secretName);

        console.log('Client secret:', secret.value);

        res.json({})
    } catch (error) {
        next(error)
    }
}

// const fetchAuthToken = async (req, res, next) => {
//     try {
//         const msalInstance = new msal.ConfidentialClientApplication(msalConfig);
//         const cryptoProvider = new msal.CryptoProvider();


//         const state = JSON.parse(cryptoProvider.base64Decode(req.body.state));

//         // if (state.csrfToken === req.session.csrfToken) {
//         // req.session.authCodeRequest.code = req.body.code; // authZ code
//         // req.session.authCodeRequest.codeVerifier = req.session.pkceCodes.verifier // PKCE Code Verifier

//         try {
//             const tokenResponse = await msalInstance.acquireTokenByCode(req.body.code);
//             console.log("Token response is ", tokenResponse)
//             // req.session.accessToken = tokenResponse.accessToken;
//             // req.session.idToken = tokenResponse.idToken;
//             // req.session.account = tokenResponse.account;
//             // req.session.isAuthenticated = true;

//             // console.log("req is ", req)

//             res.redirect(state.redirectTo);
//         } catch (error) {
//             next(error);
//         }
//         // } else {
//         //     next(new Error('csrf token does not match'));
//         // }
//     } catch (error) {
//         next(error)
//     }
// }

module.exports = {
    // fetchAuthToken,
    fetchKeyValutData
}