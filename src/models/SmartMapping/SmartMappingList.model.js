const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize.config");

const SmartMappingList = sequelize.define(
  "MappingReportSummary",
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ExternalDataProvider: DataTypes.STRING,
    Filename: DataTypes.STRING,
    TotalRecords: DataTypes.STRING,
    TotalMappedRecords: DataTypes.STRING,
    TotalUnprocessedRecords: DataTypes.STRING,
    High: DataTypes.STRING,
    Medium: DataTypes.STRING,
    Low: DataTypes.STRING,
    TotalRecordsMappedBySME: DataTypes.STRING,
    CreatedOn: DataTypes.DATE,
    Country: DataTypes.STRING,
    Category: DataTypes.STRING,
    Dimension: DataTypes.STRING,
    Dataset: DataTypes.STRING,
    DirectIndirect: DataTypes.STRING,
  },
  {
    tableName: "demo_MappingReportSummary",
    schema: "Mapping",
    timestamps: false,
  }
);

module.exports = SmartMappingList;
