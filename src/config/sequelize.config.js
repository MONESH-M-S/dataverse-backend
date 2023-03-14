const { Sequelize } = require("sequelize");
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

// const { DB_NAME, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DIALECT } = process.env;

// let encodedPassword = DB_PASSWORD;
// let bufferData = new Buffer.from(encodedPassword, "base64");
// let decodedPassowrd = bufferData.toString("ascii");

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// const sequelize = new Sequelize(DB_NAME,
//    DB_USERNAME,
//    decodedPassowrd,
//    {
//       host: DB_HOST,
//       dialect: DB_DIALECT
//    });

// const sequelize = new Sequelize({
//   dialect: "mssql",
//   dialectOptions: {
//     authentication: {
//       type: "azure-active-directory-msi-app-service",
//     },
//   },
//   host: "bieno-da08-d-904380-unilevercom-sql-01.database.windows.net",
//   database: "bieno-da08-d-904380-unilevercom-sqldb-01",
//   port: 1433,
// });

// sequelize.sync().catch((error) => {
//    console.error('Unable to create table : ', error);
// });

module.exports = sequelize;
