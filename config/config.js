require('dotenv').config();

const { DB_NAME, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DIALECT } = process.env;

const bufferData = new Buffer.from(DB_PASSWORD, "base64");
const decodedPassowrd = bufferData.toString("ascii");

module.exports = {
  development: {
    username: DB_USERNAME,
    password: decodedPassowrd,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT
  },
  production: {
    dialect: "mssql",
    dialectOptions: {
      authentication: {
        type: "azure-active-directory-msi-app-service",
      },
    },
    host: DB_HOST,
    database: DB_NAME,
    port: 1433,
  }
}; 