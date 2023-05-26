const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const MappingPeriodOutput = sequelize.define('MappingPeriodOutput', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    FileName: {
        type:DataTypes.STRING,
        primaryKey: true
    },
    Tag: DataTypes.STRING,
    Country: DataTypes.STRING,
    Category: DataTypes.STRING,
    Long: DataTypes.STRING,
    Periodicity: DataTypes.STRING,
    PeriodicityIdentifer: DataTypes.STRING,
    Convention: DataTypes.STRING,
    YearBr: DataTypes.STRING,
    WeekBr: DataTypes.STRING,
    MonthBr: DataTypes.STRING,
    QuarterBr: DataTypes.STRING,
    MinPeriodNumBr: DataTypes.STRING,
    MaxPeriodNumBr: DataTypes.STRING,
    PeriodStartDate: DataTypes.STRING,
    PeriodEndDate: DataTypes.STRING,
    PeriodNumberBr: DataTypes.STRING,
    WeekStartDayCountry: DataTypes.STRING,
    UniqueTag: DataTypes.STRING,
    Short: DataTypes.STRING,
    LastPeriodTagFormat: DataTypes.STRING,
    Flag: DataTypes.STRING
}, {
    tableName: 'MappingPeriodOutput',
    schema: 'mapping',
    timestamps: false,
});

module.exports = MappingPeriodOutput
