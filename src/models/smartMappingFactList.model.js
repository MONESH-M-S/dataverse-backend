const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");
const TempManualMappingModel = require("./tempManualMapping.model");

const SmartMappingFactListModel = sequelize.define(
  "vw_MappingReportSummary",
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
    DirectIndirect: DataTypes.STRING,
    Dataset: DataTypes.STRING,
  },
  {
    tableName: "vw_MappingReportSummary",
    schema: "Mapping",
    timestamps: false,
  }
);

SmartMappingFactListModel.hasOne(TempManualMappingModel, {
  foreignKey: "MappingOutputId",
});

module.exports = SmartMappingFactListModel;
