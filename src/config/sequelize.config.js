const { Sequelize } = require("sequelize");

const { DB_NAME, DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env

const sequelize = new Sequelize(DB_NAME,
   DB_USERNAME,
   "Royal@2468$",
   {
      host: DB_HOST,
      dialect: 'mysql'
   });

sequelize.sync().catch((error) => {
   console.error('Unable to create table : ', error);
});

module.exports = sequelize