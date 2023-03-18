const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");
const TempManualMappingModel = require("./tempManualMapping.model");

const SmartMappingListModel = sequelize.define('MappingReportSummary', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
  CreatedOn: DataTypes.STRING,
  Country: DataTypes.STRING,
  Category: DataTypes.STRING,
}, {
  tableName: 'MappingReportSummary',
  schema: 'info',
  timestamps: false,
});

SmartMappingListModel.hasOne(TempManualMappingModel, { foreignKey: 'MappingOutputId' });

module.exports = SmartMappingListModel
