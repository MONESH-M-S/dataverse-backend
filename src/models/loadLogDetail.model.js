const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const LoadLogDetailModel = sequelize.define('LoadDetailLog', {
    DetailLogId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    PipelineRunId: DataTypes.STRING,
    FileName: DataTypes.STRING,
    TaskName: DataTypes.STRING,
    StepNumber: DataTypes.STRING,
    LogDate: DataTypes.STRING,
    MessageType: DataTypes.STRING,
    LogMessage: DataTypes.STRING,
    RowCount: DataTypes.STRING,
    RowCount: DataTypes.STRING,
    ErrorCode: DataTypes.STRING,
    ErrorDesc: DataTypes.TEXT,
    LogId: DataTypes.STRING,
}, {
    tableName: 'LoadDetailLog',
    schema: 'info',
    timestamps: false,
});

module.exports = LoadLogDetailModel
