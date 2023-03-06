'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LeadLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LeadLog.init({
    PIPELINE_RUN_ID: DataTypes.STRING,
    LOAD_DESC: DataTypes.TEXT,
    LOAD_START_TIME: DataTypes.STRING,
    LOAD_END_TIME: DataTypes.STRING,
    SOURCE: DataTypes.STRING,
    COUNTRY: DataTypes.STRING,
    FILE_NAME: DataTypes.STRING,
    FILE_LAST_MODIFIED_DATE: DataTypes.STRING,
    PIPELINE_STATUS: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'LeadLog',
  });
  return LeadLog;
};