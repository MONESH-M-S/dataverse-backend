const { Sequelize } = require("sequelize");
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config')[env];

// console.log("Env is ", env)
// console.log("Config is ", config)

const sequelize = new Sequelize(config);

module.exports = sequelize;
