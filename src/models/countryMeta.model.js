const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const CountryMetaModel = sequelize.define('countries', {
    name: DataTypes.STRING,
});

module.exports = CountryMetaModel
