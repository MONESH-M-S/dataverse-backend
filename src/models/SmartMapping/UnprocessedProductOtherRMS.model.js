const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize.config");
const UnprocessedProductOtherRMSModel = sequelize.define(
  "UnProcessedRecordsProduct_RMS",
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Filename: DataTypes.STRING,
    Tag: DataTypes.STRING,
    Externaldesc: DataTypes.STRING,
    Createdon: DataTypes.STRING,
    Remark: DataTypes.STRING,
  },
  {
    tableName: "UnProcessedRecordsProduct_RMS",
    schema: "Mapping",
    timestamps: false,
  }
);

module.exports = UnprocessedProductOtherRMSModel;
