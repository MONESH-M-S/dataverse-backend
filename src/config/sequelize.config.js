const { Sequelize } = require("sequelize");
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config')[env];

console.log("Env is ", env)
console.log("Config is ", config)

const sequelize = new Sequelize({
    dialect: "mssql",
    dialectOptions: {
        authentication: {
            type: "azure-active-directory-msi-app-service",
        },
    },
    host: "bieno-da08-d-904380-unilevercom-sql-01.database.windows.net",
    database: "bieno-da08-d-904380-unilevercom-sqldb-01",
    port: 1433
});

module.exports = sequelize;
