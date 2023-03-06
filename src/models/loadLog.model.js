const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const LoadLogModel = sequelize.define('load_log', {
    PIPELINE_RUN_ID: DataTypes.STRING,
    LOAD_DESC: DataTypes.TEXT,
    LOAD_START_TIME: DataTypes.STRING,
    LOAD_END_TIME: DataTypes.STRING,
    SOURCE: DataTypes.STRING,
    FILE_NAME: DataTypes.STRING,
    FILE_LAST_MODIFIED_DATE: DataTypes.STRING,
    PIPELINE_STATUS: DataTypes.STRING,
    RUNNING_USER: DataTypes.STRING,
});

module.exports = LoadLogModel
