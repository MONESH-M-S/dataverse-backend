const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const MappingPeriodOutputPOS = sequelize.define(
  "MappingPeriodOutput_POS",
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    FileName: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    Date: DataTypes.STRING,
    Tag: DataTypes.STRING,
    Country: DataTypes.STRING,
    MarketName: DataTypes.STRING,
    WeekCommencing: DataTypes.STRING,
    Periodicity: DataTypes.STRING,
    YearBr: DataTypes.STRING,
    WeekBr: DataTypes.STRING,
    QuarterBr: DataTypes.STRING,
    MonthBr: DataTypes.STRING,
    MonthNumber: DataTypes.STRING,
    PeriodNumberBr: DataTypes.STRING,
    MinPeriod: DataTypes.STRING,
    MaxPeriod: DataTypes.STRING,
    PeriodStartDate: DataTypes.STRING,
    PeriodEndDate: DataTypes.STRING,
    YearWeek: DataTypes.STRING,
    YearMonth: DataTypes.STRING,
    WeekStartDayCountry: DataTypes.STRING,
    CreatedOn: DataTypes.STRING,
    ConfidenceScore: DataTypes.STRING,
    ConfidenceLevel: DataTypes.STRING,
    Flag: DataTypes.STRING,
  },
  {
    tableName: "MappingPeriodOutput_POS",
    schema: "Mapping",
    timestamps: false,
  }
);

module.exports = MappingPeriodOutputPOS;
