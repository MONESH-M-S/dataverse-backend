const { DataTypes } = require("sequelize");
const sequelize = require("../../../../config/sequelize.config");

const MarketDetailOtherRMS = sequelize.define(
  "MappingMarketOutput_RMS",
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Filename: DataTypes.STRING,
    Cell: DataTypes.STRING,
    Long: DataTypes.STRING,
    HierName: DataTypes.STRING,
    HierLevelName: DataTypes.STRING,
    Tag: DataTypes.STRING,
    Country: DataTypes.STRING,
    Category: DataTypes.STRING,
    Channel: DataTypes.STRING,
    ChannelConfidence: DataTypes.STRING,
    ConfidenceScoreChannel: DataTypes.STRING,
    UniqueTag: DataTypes.STRING,
    TotalMarket: DataTypes.STRING,
    ConfidenceScoreTotal: DataTypes.STRING,
    TotalConfidence: DataTypes.STRING,
    Flag: DataTypes.STRING,
    Createdon: DataTypes.STRING,
    ParentTag: DataTypes.STRING,
    HierNum: DataTypes.STRING,
    Short: DataTypes.STRING,
    HierLevelNum: DataTypes.STRING,
    Confidencelevel: DataTypes.STRING,
    ISOCountry: DataTypes.STRING,
  },
  {
    tableName: "MappingMarketOutput_RMS",
    schema: "Mapping",
    timestamps: false,
  }
);

module.exports = MarketDetailOtherRMS;