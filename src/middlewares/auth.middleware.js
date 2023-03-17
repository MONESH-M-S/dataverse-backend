const jwt = require("jsonwebtoken");
const { msalConfig } = require("../config/msal.config");

module.exports = (req, res, next) => {

  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const validationOptions = {
      audience: config.auth.clientId,
      issuer: config.auth.authority + "/v2.0"
    }

    jwt.verify(token, getSigningKeys, validationOptions, (err, payload) => {
      if (err) {
        console.log(err);
        return next();
      }

      next();
    });
  } else {
    next();
  }
};

const getSigningKeys = (header, callback) => {
  const tenantId = msalConfig.tenant
  const DISCOVERY_KEYS_ENDPOINT = "https://login.microsoftonline.com/" + tenantId + "/discovery/v2.0/keys";

  var client = jwksClient({
    jwksUri: DISCOVERY_KEYS_ENDPOINT
  });

  client.getSigningKey(header.kid, function (err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}
