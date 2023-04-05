const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const TempManualMappingModel = sequelize.define('TempManualMapping', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Filename: DataTypes.STRING,
    Tag: DataTypes.STRING,
    Hierlevelname: DataTypes.STRING,
    Skucode: DataTypes.STRING,
    Createdon: DataTypes.STRING,
    Externaldesc: DataTypes.STRING,
    Internaldesc: DataTypes.STRING,
    MappingOutputId: DataTypes.INTEGER,
}, {
    tableName: 'TempManualMapping',
    schema: 'Mapping',
    timestamps: false,
    hasTrigger: true
});

module.exports = TempManualMappingModel
