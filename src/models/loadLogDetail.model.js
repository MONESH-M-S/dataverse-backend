const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const LoadLogModel = sequelize.define('load_log', {
    PIPELINE_RUN_ID: DataTypes.STRING,
    FILE_NAME: DataTypes.TEXT,
    TASK_NAME: DataTypes.STRING,
    STEP_NUMBER: DataTypes.STRING,
    LOG_DATE: DataTypes.STRING,
    MESSAGE_TYPE: DataTypes.STRING,
    LOG_MESSAGE: DataTypes.STRING,
    ROW_COUNT: DataTypes.STRING,
    ERROR_CODE: DataTypes.STRING,
    ERROR_DESC: DataTypes.TEXT,
});

module.exports = LoadLogModel
