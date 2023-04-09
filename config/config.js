const env = process.env.APP_ENVIRONMENT||'local';

const { DB_NAME, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DIALECT } = process.env;

const bufferData = new Buffer.from(DB_PASSWORD, "base64");
const decodedPassowrd = bufferData.toString("ascii");

const configMap = {
  local: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
    port: 1433,
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT
  },
  development: {
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
}

module.exports = configMap[env]