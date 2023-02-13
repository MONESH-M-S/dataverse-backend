const { primitive, createModelSchema } = require("serializr");

class LoginSerializer {
  email;
  password;
}

createModelSchema(LoginSerializer, {
  email: primitive(),
  password: primitive(),
});

module.exports = LoginSerializer;
