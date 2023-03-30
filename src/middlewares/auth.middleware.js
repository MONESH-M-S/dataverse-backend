const { msalConfig, scopes } = require("../config/msal.config");
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
  jwksUri: 'https://login.microsoftonline.com/' + msalConfig.tenant + '/discovery/v2.0/keys',
});

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send('Authorization header missing');
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).send('Invalid authorization header');
  }

  const token = parts[1];

  try {
    // Get the key ID from the access token header
    const header = jwt.decode(token, { complete: true }).header;
    const kid = header.kid;

    var verifyOptions = {
      algorithms: ['RS256'],
      header: header
    };

    const key = await client.getSigningKey(kid);
    const signingKey = key.rsaPublicKey;

    // Verify the access token using the public key
    const decoded = jwt.verify(token, signingKey, verifyOptions);

    // Set the user object on the request for downstream middleware/routes to access
    req.user = {
      name: decoded.name,
      email: decoded.email
    };
    next();
  } catch (error) {
    console.log(error);
    next(error)
    // return res.status(401).send('Invalid token');
  }

};