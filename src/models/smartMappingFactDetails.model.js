const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const SmartMappingFactDetailsModel = sequelize.define(
  "MappingFactOutput",
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Filename: DataTypes.STRING,
    Uniqueidentifier: DataTypes.STRING,
    Tag: DataTypes.STRING,
    Country: DataTypes.STRING,
    Category: DataTypes.STRING,
    Short: DataTypes.STRING,
    Displayorder: DataTypes.NUMBER,
    Currency: DataTypes.STRING,
    Precision: DataTypes.NUMBER,
    Denominator: DataTypes.NUMBER,
    Externaldesc: DataTypes.STRING,
    Facttype: DataTypes.ENUM("Non Additive", "Additive"),
    Harmonizedname: DataTypes.STRING,
    Confidencescore: DataTypes.DECIMAL,
    Confidencelevel: DataTypes.STRING,
    Flag: DataTypes.STRING,
  },
  {
    tableName: "MappingFactOutput",
    schema: "Mapping",
    timestamps: false,
  }
);

module.exports = SmartMappingFactDetailsModel;
