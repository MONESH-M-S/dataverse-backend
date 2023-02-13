const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('sqlite::memory:');

sequelize.sync().then(() => {
    console.log('Book table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

module.exports= sequelize