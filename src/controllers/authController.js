const { ConfidentialClientApplication } = require('@azure/msal-node');
const { msalConfig, redirectionUrl, scopes, frontendBaseUrl } = require('../config/msal.config');
const { keyVaultName, keyName } = require('../config/keyVault.config')
const jwt_decode = require('jwt-decode');
const { SecretClient } = require('@azure/keyvault-secrets');
const { DefaultAzureCredential } = require('@azure/identity');
const UserModel = require('../models/user.model');
const userStatusEnum = require('../models/enums/userStatus.enum');

const fetchKeyVaultSecretvalue = async () => {

    // const { keyVaultName, keyName } = keyVaultconfig
    const KVUri = `https://${keyVaultName}.vault.azure.net`;

    const credential = new DefaultAzureCredential();
    const client = new SecretClient(KVUri, credential);

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

            const userName = tokenResponse.account.username
            const name = tokenResponse.account.name

            let userDetails = await UserModel.findOne({
                Email: userName
            })
            res.cookie('authToken', tokenResponse.accessToken, { sameSite: false, secure: false });

            if (!userDetails) {
                await UserModel.create({
                    Name: name,
                    Email: userName,
                })
                res.redirect(frontendBaseUrl + "/role-selection")
            }

            if (!userDetails.Role) res.redirect(frontendBaseUrl + "/role-selection")

            res.redirect(frontendBaseUrl + "/home")

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

const fetchProfile = async (req, res, next) => {

    try {
        const cookie = req.cookies
        var decodedData = jwt_decode(cookie.authToken);
        const email = decodedData.unique_name
        const userDetails = await UserModel.findOne({
            Email: email
        })

        res.json(userDetails)
    } catch (error) {
        next(error)
    }

}

const updateProfile = async (req, res, next) => {
    try {
        const { role, avatar } = req.body
        const token = req.headers.authorization.split(" ")[1]
        var decodedData = jwt_decode(token);
        const email = decodedData.unique_name
        const userDetails = await UserModel.findOne({
            Email: email
        })

        userDetails.Role = role
        userDetails.Avatar = avatar
        userDetails.Status = userStatusEnum.approved
        userDetails.save();

        res.json({
            "message": "Successfully updated"
        })

    } catch (error) {
        next(error)
    }
}

module.exports = {
    fetchAuthToken,
    generateAuthToken,
    fetchProfile,
    updateProfile
}