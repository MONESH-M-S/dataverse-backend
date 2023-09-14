const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize.config");

const PeriodMetadata = sequelize.define(
  "PeriodPosMetadata",
  {
    Id: { type: DataTypes.NUMBER, primaryKey: true, autoIncrement: true },
    Data_Provider: { type: DataTypes.STRING },
    Country1: { type: DataTypes.STRING },
    MarketName: { type: DataTypes.STRING },
    Direct_Indirect: { type: DataTypes.STRING },
    Source_File_Path: { type: DataTypes.STRING },
    FileType: { type: DataTypes.STRING },
    Periodi: { type: DataTypes.STRING },
    ISOCountry: { type: DataTypes.STRING },
    FileSplitbasedOnDimensions: { type: DataTypes.STRING },
    Filepath: { type: DataTypes.STRING },
    DateFormat: { type: DataTypes.STRING },
    WeekStartDayCountry: { type: DataTypes.STRING },
    DateForPeriod: { type: DataTypes.STRING },
  },
  {
    tableName: "PeriodPosMetadata",
    schema: "metadata",
    timestamps: false,
  }
);

module.exports = PeriodMetadata;
