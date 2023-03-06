'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LeadLogDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LeadLogDetails.belongsTo(models.LeadLog, {
        targetKey: 'PIPELINE_RUN_ID'
      });
    }
  }
  LeadLogDetails.init({
    PIPELINE_RUN_ID: DataTypes.STRING,
    FILE_NAME: DataTypes.STRING,
    TASK_NAME: DataTypes.STRING,
    STEP_NUMBER: DataTypes.STRING,
    LOG_DATE: DataTypes.STRING,
    MESSAGE_TYPE: DataTypes.STRING,
    LOG_MESSAGE: DataTypes.TEXT,
    ROW_COUNT: DataTypes.STRING,
    ERROR_CODE: DataTypes.STRING,
    ERROR_DESC: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'LeadLogDetails',
  });
  return LeadLogDetails;
};