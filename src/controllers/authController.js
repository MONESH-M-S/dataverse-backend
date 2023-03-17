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

        // const secret = await fetchKeyVaultSecretvalue()

        msalConfig.auth.clientSecret = "Y5t8Q~YWA1s9sT6ToOqA1NH3aVLhZoBIfG4RMaaz"

        console.log("Masl config is ", msalConfig)

        const msalInstance = new msal.ConfidentialClientApplication(msalConfig);
        // const cryptoProvider = new msal.CryptoProvider();

        // const code  = req.body.code

        const code = "0.AQwAAq5v9jZdW0m_4Him_5-ObgPAj21ZBERLjniTfz128AkMAJA.AgABAAIAAAD--DLA3VO7QrddgJg7WevrAgDs_wUA9P88495uBDlzyBTEJWdbvadI9UPmC3COsfOR_Knqcno1b4FQLxkC9EcpOn1Ji2-q8qv0U2MuHOON_u2YJgl4kT6NkAYisxKHQ1ZhPDk7DFr9NnAZRmdtj8ba0IW8wtrr3yKNYYsxWY3Ha3yotDXGnDh_zZ4mfMYsA6Ad60npuBnlUhm52ciPfl8UAHsvD2LjK_G5FQImGZ6MHY2dWm_2wQNxrOHTG-PuTGKU0pAYBwfcG-Ua4gbx4AsQyRryqmSwaptSfhKsnZBnL9VG8IyfSWKyvvcjo32oAPHljJOqcYsN3amK3YqP-UKvoH0hNTkrd13hGIePdhMaPF00JslafWpIYrW0vw9sAcYmM9cKVVjqU4Npesxqkh6TpIm7pYOO_VCbKFkej1dp6Qh3qR_IRMdmV1wvRbDB6hvCAd1oKLJ8L6l-MjmXojT-VtfUnyH65Pq_Ot3eo69FO68jmzo8tlLPWed7ARYQ1ogudPuPwIJYruwpqWQYCf1pGg_lduwcfnIpNgxhXCDYrgU2gvf268p1DUJWYQrgB_i2KJ7PjghV8XavA2-ztZ6QtOf0Ztwe7TFsC9ka4rz4e2o6liORlJFs1B4IfB6I1NGGkXlXgKHZayrGG3fpxVDOr4jxb1xz70TqLMWPYbWHoM1RYwwXtVMlEJ4udeyURmS3kxJFH2lf-sYz2RP-e-Usw0wDJyN3qg7mhIAVMMiOonldvF1pskN37TXkKhvdiDucrLdI5VPUaXysvvT5009gooXiHxL4kwRPoG9YMJ1stHlpBgjMBHzgCdAiFO0rotYTIrSEBfKiezT0H4U4tFXbPQ"

        // const state = JSON.parse(cryptoProvider.base64Decode(req.body.state));

        // if (state.csrfToken === req.session.csrfToken) {
        // req.session.authCodeRequest.code = req.body.code; // authZ code
        // req.session.authCodeRequest.codeVerifier = req.session.pkceCodes.verifier // PKCE Code Verifier

        try {
            const tokenResponse = await msalInstance.acquireTokenByCode(code);
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