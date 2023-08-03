const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize.config");

const FactMetadata = sequelize.define(
  "NielsenFactMetadata",
  {
    Id: { type: DataTypes.NUMBER, primaryKey: true, autoIncrement: true },
    UniqueTag: DataTypes.STRING,
    TagLong: DataTypes.STRING,
    TAG_Internal: DataTypes.STRING,
    SHORT_Internal: DataTypes.NUMBER,
    LONG_Internal: DataTypes.STRING,
    Cell: DataTypes.STRING,
    CountryName: DataTypes.STRING,
    NielsenMarketName: DataTypes.STRING,
    Fact_Type_Internal: DataTypes.STRING,
    GOOGLETRANS: DataTypes.STRING,
    HarmonisedAttribute: DataTypes.STRING,
    GlobalHarmonisedAttribute: DataTypes.STRING
  },
  {
    tableName: "NielsenFactMetadata",
    schema: "metadata",
    timestamps: false,
  }
);

module.exports = FactMetadata;
