const { Sequelize } = require("sequelize");

const { DB_NAME, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DIALECT } = process.env;

let encodedPassword = DB_PASSWORD;
let bufferData = new Buffer.from(encodedPassword, "base64");
let decodedPassowrd = bufferData.toString("ascii");

// const sequelize = new Sequelize(DB_NAME,
//    DB_USERNAME,
//    decodedPassowrd,
//    {
//       host: DB_HOST,
//       dialect: DB_DIALECT
//    });

const sequelize = new Sequelize({
  dialect: "mssql",
  dialectOptions: {
    authentication: {
      type: "azure-active-directory-msi-app-service",
    },
    options: {
      encrypt: true, // Required for Azure SQL Database
      trustServerCertificate: true, // Required for Azure SQL Database
    },
  },
  database: "bieno-da08-d-904380-unilevercom-sqldb-01",
  server: "bieno-da08-d-904380-unilevercom-sql-01.database.windows.net",
  username: "",
  password: "",
  port: 1433,
});

// sequelize.sync().catch((error) => {
//    console.error('Unable to create table : ', error);
// });

module.exports = sequelize;
