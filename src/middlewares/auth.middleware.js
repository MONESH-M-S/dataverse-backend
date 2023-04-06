const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const getSigningKeys = (header, callback) => {
  var client = jwksClient({
    jwksUri: `https://login.microsoftonline.com/f66fae02-5d36-495b-bfe0-78a6ff9f8e6e/discovery/v2.0/keys`,
  });

  client.getSigningKey(header.kid, function (err, key) {
    var signingKey = key.getPublicKey();
    callback(err, signingKey);
  });
};

const validationOptions = {
  audience: `api://6d8fc003-0459-4b44-8e78-937f3d76f009`,
  issuer: `https://sts.windows.net/f66fae02-5d36-495b-bfe0-78a6ff9f8e6e/`,
};

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("Authorization header missing");
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2) {
    return res.status(401).send("Invalid authorization header");
  }

  const token = parts[1];

  try {
    jwt.verify(token, getSigningKeys, validationOptions, (err, payload) => {
      if (err) {
        console.log(err);
        return res.send(err).status(403);
      }

      // Set the user object on the request for downstream middleware/routes to access
      req.user = {
        name: payload.name,
        email: payload.upn,
      };

      next();
    });
    
  } catch (error) {
    console.log(error);
    next(error);
  }
};
