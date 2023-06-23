const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const MappingFlagDetailsModel = sequelize.define(
  "MappingFlagDetails",
  {
    FID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    FlagDesc: DataTypes.STRING,
    Identifier: DataTypes.STRING,
    Flagtype: DataTypes.STRING,
  },
  {
    tableName: "MappingFlagDetails",
    schema: "metadata",
    timestamps: false,
  }
);

module.exports = MappingFlagDetailsModel;
