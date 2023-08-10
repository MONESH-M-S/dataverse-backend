const { DataTypes } = require("sequelize");
const sequelize = require("../../../../config/sequelize.config");

const FactDeatilPOS = sequelize.define(
  "MappingFactOutput_POS",
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Filename: {
      type: DataTypes.STRING,
      primaryKey: true,
    },

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
  },
  {
    tableName: "MappingFactOutput_POS",
    schema: "Mapping",
    timestamps: false,
  }
);

module.exports = FactDeatilPOS;
