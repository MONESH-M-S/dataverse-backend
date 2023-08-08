const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/sequelize.config");

const PeriodDetailOtherRMS = sequelize.define(
  "MappingPeriodOutput_RMS",
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Filename: DataTypes.STRING,
    Tag: DataTypes.STRING,
    Country: DataTypes.STRING,
    Category: DataTypes.STRING,
    Long: DataTypes.STRING,
    Periodicity: DataTypes.STRING,
    PeriodicityIdentifer: DataTypes.STRING,
    LastPeriodTagFormat: DataTypes.STRING,
    Convention: DataTypes.STRING,
    YearBr: DataTypes.STRING,
    WeekBr: DataTypes.STRING,
    QuarterBr: DataTypes.STRING,
    MonthBr: DataTypes.STRING,
    MonthNumber: DataTypes.STRING,
    PeriodNumberBr: DataTypes.STRING,
    MinPeriodNumBr: DataTypes.STRING,
    MaxPeriodNumBr: DataTypes.STRING,
    YearWeek: DataTypes.STRING,
    YearMonth: DataTypes.STRING,
    WeekStartDayCountry: DataTypes.STRING,
    PeriodStartDate: DataTypes.STRING,
    PeriodEndDate: DataTypes.STRING,
    UniqueTag: DataTypes.STRING,
    CellPeriod: DataTypes.STRING,
    CreatedOn: DataTypes.STRING,
    Flag: DataTypes.STRING,
    ConfidenceScore: DataTypes.STRING,
    ConfidenceLevel: DataTypes.STRING,
    ISOCountry: DataTypes.STRING,
  },
  {
    tableName: "MappingPeriodOutput_RMS",
    schema: "Mapping",
    timestamps: false,
  }
);

module.exports = PeriodDetailOtherRMS;