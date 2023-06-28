const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const MappingMarketOutputPOS = sequelize.define(
  "MappingMarketOutput_POS",
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    FileName: {
      type: DataTypes.STRING,
    },
    DataProvider: DataTypes.STRING,
    Direct_Indirect: DataTypes.STRING,
    Country: DataTypes.STRING,
    ISOCountry: DataTypes.STRING,
    Date: DataTypes.STRING,
    UniqueTag: DataTypes.STRING,
    Customer: DataTypes.STRING,
    Market_name: DataTypes.STRING,
    StoreName: DataTypes.STRING,
    CellCoverage: DataTypes.STRING,
    MarketShort: DataTypes.STRING,
    MarketLong: DataTypes.STRING,
    Dimension: DataTypes.STRING,
    CreatedOn: DataTypes.STRING,
    ConfidenceScore: DataTypes.STRING,
    ConfidenceLevel: DataTypes.STRING,
    Flag: DataTypes.STRING,
  },
  {
    tableName: "MappingMarketOutput_POS",
    schema: "Mapping",
    timestamps: false,
  }
);

module.exports = MappingMarketOutputPOS;
