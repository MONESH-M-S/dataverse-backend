const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const ColumnMappingModel = sequelize.define(
  "ColumnMappingv5",
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
    CriticalAttributes_Flag: DataTypes.STRING,
  },
  {
    tableName: "ColumnMappingv5",
    schema: "metadata",
    timestamps: false,
  }
);

module.exports = ColumnMappingModel;
