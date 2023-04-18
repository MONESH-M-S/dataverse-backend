const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const ColumnMappingModel = sequelize.define('ColumnMappingv3', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    FileName: DataTypes.STRING,
    Country: DataTypes.STRING,
    Category: DataTypes.STRING,
    Entity: DataTypes.STRING,
    SourceColumn: DataTypes.STRING,
    TargetColumn: DataTypes.STRING,
    ZipFileName: DataTypes.STRING,
}, {
    tableName: 'ColumnMappingv3',
    schema: 'metadata',
    timestamps: false,
});

module.exports = ColumnMappingModel;
