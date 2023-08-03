const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const SourceDetails = sequelize.define(
  "SourceDetails",
  {
    Id: { type: DataTypes.NUMBER, primaryKey: true, autoIncrement: true },
    DataProvider: DataTypes.STRING,
    Format: DataTypes.STRING,
    Country: DataTypes.STRING,
    Category: DataTypes.STRING,
    Filename: DataTypes.STRING,
    Expected: DataTypes.STRING,
    Period: DataTypes.STRING,
    Language: DataTypes.STRING,
    Source: DataTypes.STRING,
    Interim: DataTypes.STRING,
    Target: DataTypes.STRING,
    IsActive: DataTypes.NUMBER,
  },
  {
    tableName: "SourceDetails",
    schema: "metadata",
    timestamps: false,
  }
);

module.exports = SourceDetails;
