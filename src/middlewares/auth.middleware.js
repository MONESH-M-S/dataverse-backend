const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const getSigningKeys = (header, callback) => {
  var client = jwksClient({
    jwksUri: process.env.DISCOVERY_URL,
  });

  client.getSigningKey(header.kid, function (err, key) {
    var signingKey = key.getPublicKey();
    callback(err, signingKey);
  });
};

const validationOptions = {
  audience: process.env.AUDIENCE,
  issuer: process.env.ISSUER,
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
