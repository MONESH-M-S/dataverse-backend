const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const MappingProductOutputPOS = sequelize.define(
  "MappingProductOutput_POS",
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
    Confidencelevel: DataTypes.STRING,
    Productidentifiername: DataTypes.STRING,
    Productidentifier: DataTypes.INTEGER,
    Externaldesc: DataTypes.STRING,
    Internaldesc: DataTypes.STRING,
    Marketname: DataTypes.STRING,
    Sectorname: DataTypes.STRING,
    Segmentname: DataTypes.STRING,
    Productformname: DataTypes.STRING,
    Spfvname: DataTypes.STRING,
    Productpackformname: DataTypes.STRING,
    Productpacksizename: DataTypes.STRING,
    Productcodename: DataTypes.STRING,
    Productname: DataTypes.STRING,
    Uniqueidentifier: DataTypes.STRING,
    Productidentifiername: DataTypes.STRING,
    Productidentifier: DataTypes.STRING,
    Divisionname: DataTypes.STRING,
    Categoryname: DataTypes.STRING,
    Corporatebrandname: DataTypes.STRING,
    Formname: DataTypes.STRING,
    Subformname: DataTypes.STRING,
    Productvariantname: DataTypes.STRING,
  },
  {
    tableName: "MappingProductOutput_POS",
    schema: "mapping",
    timestamps: false,
  }
);

module.exports = MappingProductOutputPOS;
