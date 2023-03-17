const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const LoadLogModel = sequelize.define('LoadLog', {
    LogId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    PIPELINERUNID: DataTypes.STRING,
    LOADDESC: DataTypes.TEXT,
    LOADSTARTTIME: DataTypes.STRING,
    LOADENDTIME: DataTypes.STRING,
    SOURCE: DataTypes.STRING,
    CATEGORY: DataTypes.STRING,
    FILENAME: DataTypes.STRING,
    FILELASTMODIFIEDDATE: DataTypes.STRING,
    PIPELINESTATUS: DataTypes.STRING,
    RUNNINGUSER: DataTypes.STRING,
    COUNTRY: DataTypes.STRING,
}, {
    tableName: 'LoadLog',
    schema: 'info',
    timestamps: false,
});

module.exports = LoadLogModel
