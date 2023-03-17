const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const ColumnMappingModel = sequelize.define('ColumnMapping', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    FileName: DataTypes.STRING,
    SourceColumn: DataTypes.STRING,
    TargetColumn: DataTypes.STRING,
}, {
    tableName: 'ColumnMapping',
    schema: 'metadata',
    timestamps: false,
});

module.exports = ColumnMappingModel
