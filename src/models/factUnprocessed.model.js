const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const FactUnprocessed = sequelize.define('UnProcessedRecordsFact', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Filename: DataTypes.STRING,
    Uniqueidentifier: DataTypes.STRING,
    Tag: DataTypes.STRING,
    Country: DataTypes.STRING,
    Category: DataTypes.STRING,
    Displayorder: DataTypes.STRING,
    Currency: DataTypes.STRING,
    Precision: DataTypes.STRING,
    Denominator: DataTypes.STRING,
    Externaldesc: DataTypes.STRING,
    Facttype: DataTypes.STRING,
    Harmonizedname: DataTypes.STRING,
    Confidencescore: DataTypes.STRING,
    Confidencelevel: DataTypes.STRING,
    Createdon: DataTypes.STRING,
    Flag: DataTypes.STRING,
    Metadataflag: DataTypes.STRING,
}, {
    tableName: 'UnProcessedRecordsFact',
    schema: 'Mapping',
    timestamps: false,
});

module.exports = FactUnprocessed;
