"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

const { DB_NAME, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DIALECT } = process.env;

console.log("Environment is ", env)

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
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

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
