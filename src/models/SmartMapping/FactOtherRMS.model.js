const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/sequelize.config");

const SmartMappingFactOtherRMSModel = sequelize.define(
  "MappingFactOutput_RMS",
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Filename: DataTypes.STRING,
    Uniqueidentifier: DataTypes.STRING,
    Country: DataTypes.STRING,
    ISOCountryCode: DataTypes.STRING,
    DataProvider: DataTypes.STRING,
    Direct_Indirect: DataTypes.STRING,
    Short: DataTypes.STRING,
    Externaldesc: DataTypes.STRING,
    Currency: DataTypes.STRING,
    Facttype: DataTypes.STRING,
    Harmonizedname: DataTypes.STRING,
    Confidencescore: DataTypes.STRING,
    Confidencelevel: DataTypes.STRING,
    Createdon: DataTypes.STRING,
    Flag: DataTypes.STRING,
    File_Split_based_on_Dimensions: DataTypes.STRING,
    Category: DataTypes.STRING,
  },
  {
    tableName: "MappingFactOutput_RMS",
    schema: "Mapping",
    timestamps: false,
  }
);

module.exports = SmartMappingFactOtherRMSModel;