const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const ProviderMetaModel = sequelize.define('providers', {
    name: DataTypes.STRING,
});

module.exports = ProviderMetaModel
