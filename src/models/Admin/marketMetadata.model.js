const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize.config");

const MarketMetadata = sequelize.define(
  "NielsenMarketMetadata",
  {
    Id: { type: DataTypes.NUMBER, primaryKey: true, autoIncrement: true },
    Market_ID: DataTypes.NUMBER,
    Country: DataTypes.STRING,
    Category: DataTypes.STRING,
    Cell: DataTypes.STRING,
    Long: DataTypes.STRING,
    HierName: DataTypes.STRING,
    HierLevelName: DataTypes.STRING,
    Channel: DataTypes.STRING,
    UniqueTag: DataTypes.STRING,
    TotalMarket: DataTypes.STRING,
    Tag: DataTypes.STRING,
  },
  {
    tableName: "NielsenMarketMetadata",
    schema: "metadata",
    timestamps: false,
  }
);

module.exports = MarketMetadata;
