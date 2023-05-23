const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const DQCheckModel = sequelize.define('vw_MappingReportSummary', {
  Country: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  Category: DataTypes.STRING,
  CellDatabase: DataTypes.STRING,
  zipFile: DataTypes.STRING,
  Overall_Status: DataTypes.STRING,
  DeliveryPeriod: DataTypes.STRING,
  Number_of_files_that_passed_Check: DataTypes.STRING,
  Number_of_files_that_failed_Check: DataTypes.STRING,
  Remarks: DataTypes.STRING,
}, {
  tableName: 'DQ_Checks',
  schema: 'info',
  timestamps: false,
});


module.exports = DQCheckModel
