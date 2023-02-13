const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const LibraryModel = sequelize.define('Library', {
    name: DataTypes.STRING,
    athor: DataTypes.STRING,
});

module.exports = LibraryModel
