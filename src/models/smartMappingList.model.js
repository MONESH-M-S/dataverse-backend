const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const SmartMappingListModel = sequelize.define(
  "temp_MappingReportSummary",
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
  },
  {
    tableName: "temp_MappingReportSummary",
    schema: "Mapping",
    timestamps: false,
  }
);

module.exports = SmartMappingListModel;
