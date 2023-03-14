require('dotenv').config();

const { DB_NAME, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DIALECT } = process.env;

const bufferData = new Buffer.from(DB_PASSWORD, "base64");
const decodedPassowrd = bufferData.toString("ascii");

module.exports = {
  development: {
    dialect: "mssql",
    dialectOptions: {
      authentication: {
        type: "azure-active-directory-msi-app-service",
      },
    },
    host: "bieno-da08-d-904380-unilevercom-sql-01.database.windows.net",
    database: "bieno-da08-d-904380-unilevercom-sqldb-01",
    port: 1433,
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
    host: "bieno-da08-d-904380-unilevercom-sql-01.database.windows.net",
    database: "bieno-da08-d-904380-unilevercom-sqldb-01",
    port: 1433,
  }
}; 