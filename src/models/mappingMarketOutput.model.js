const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const MappingMarketOutput = sequelize.define(
  "MappingMarketOutput",
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    FileName: {
      type: DataTypes.STRING,
    },
    Cell: DataTypes.STRING,
    Long: DataTypes.STRING,
    HierName: DataTypes.STRING,
    HierLevelName: DataTypes.STRING,
    Tag: DataTypes.STRING,
    Country: DataTypes.STRING,
    Category: DataTypes.STRING,
    Channel: DataTypes.STRING,
    UniqueTag: DataTypes.STRING,
    TotalMarket: DataTypes.STRING,
    CreatedOn: DataTypes.STRING,
    Flag: DataTypes.STRING,
    ParentTag: DataTypes.STRING,
    HierNum: DataTypes.STRING,
    Short: DataTypes.STRING,
    HierLevelNum: DataTypes.STRING,
    ChannelConfidence: DataTypes.STRING,
    TotalConfidence: DataTypes.STRING,
    Confidencelevel: DataTypes.STRING,
  },
  {
    tableName: "MappingMarketOutput",
    schema: "Mapping",
    timestamps: false,
  }
);

module.exports = MappingMarketOutput;
