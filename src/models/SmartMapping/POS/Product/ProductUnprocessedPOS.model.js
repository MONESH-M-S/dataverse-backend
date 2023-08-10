const { DataTypes } = require("sequelize");
const sequelize = require("../../../../config/sequelize.config");

const ProductUnprocessedPOS = sequelize.define(
  "UnProcessedRecordsProduct_POS",
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Filename: DataTypes.STRING,
    Productidentifiername: DataTypes.STRING,
    Productidentifier: DataTypes.STRING,
    Externaldesc: DataTypes.STRING,
    Createdon: DataTypes.STRING,
    Remark: DataTypes.STRING,
  },
  {
    tableName: "UnProcessedRecordsProduct_POS",
    schema: "Mapping",
    timestamps: false,
  }
);

module.exports = ProductUnprocessedPOS;
