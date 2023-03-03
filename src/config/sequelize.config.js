const { Sequelize } = require("sequelize");

const { DB_NAME, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DIALECT } = process.env

let encodedPassword = DB_PASSWORD;
let bufferData = new Buffer.from(encodedPassword, 'base64');
let decodedPassowrd = bufferData.toString('ascii');

const sequelize = new Sequelize(DB_NAME,
   DB_USERNAME,
   decodedPassowrd,
   {
      host: DB_HOST,
      dialect: DB_DIALECT
   });

sequelize.sync().catch((error) => {
   console.error('Unable to create table : ', error);
});

module.exports = sequelize