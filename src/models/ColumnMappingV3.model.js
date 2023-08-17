const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const ColumnMappingModel = sequelize.define(
  "ColumnMapping",
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    FileName: DataTypes.STRING,
    Country: DataTypes.STRING,
    Category: DataTypes.STRING,
    Entity: DataTypes.STRING,
    SourceColumnList: DataTypes.STRING,
    SourceColumn: DataTypes.STRING,
    TargetColumn: DataTypes.STRING,
    ZipFileName: DataTypes.STRING,
    CriticalFlag: DataTypes.STRING,
  },
  {
    tableName: "ColumnMapping",
    schema: "metadata",
    timestamps: false,
  }
);

module.exports = ColumnMappingModel;
