const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const SmartMappingDetailsModel = sequelize.define('MappingProductOutput', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Tag: DataTypes.STRING,
    Filename: DataTypes.STRING,
    Internaldesc: DataTypes.STRING,
    Externaldesc: DataTypes.STRING,
    Skucode: DataTypes.STRING,
    Hierlevelname: DataTypes.STRING,
    // Categoryname: DataTypes.STRING,
    Divisionname: DataTypes.STRING,
    Categorygroupname: DataTypes.STRING,
    Segmentname: DataTypes.STRING,
    Productformmediumname: DataTypes.STRING,
    Confidencelevel: DataTypes.STRING,
    Brandformname: DataTypes.STRING,
    Confidencescore: DataTypes.STRING,
    Spfvname: DataTypes.STRING,
    Categoryname: DataTypes.STRING,
    Marketname: DataTypes.STRING,
    Corporatebrandname: DataTypes.STRING,
    Productformname: DataTypes.STRING
}, {
    tableName: 'MappingProductOutput',
    schema: 'Mapping',
    timestamps: false,
});

module.exports = SmartMappingDetailsModel
