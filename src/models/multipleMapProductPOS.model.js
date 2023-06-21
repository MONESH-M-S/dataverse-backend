const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const MultipleMapProductPOS = sequelize.define(
  "MultipleMapProduct_POS",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Productidentifiername: DataTypes.STRING,
    Productidentifier: DataTypes.STRING,
    Externaldesc: DataTypes.STRING,
    Internaldesc: DataTypes.STRING,
    Skucode: DataTypes.STRING,
    Divisionname: DataTypes.STRING,
    Categoryname: DataTypes.STRING,
    Marketname: DataTypes.STRING,
    Corporatebrandname: DataTypes.STRING,
    Uniqueindentifier: DataTypes.STRING,
  },
  {
    tableName: "MultipleMapProduct_POS",
    schema: "mapping",
    timestamps: false,
  }
);

module.exports = MultipleMapProductPOS;
