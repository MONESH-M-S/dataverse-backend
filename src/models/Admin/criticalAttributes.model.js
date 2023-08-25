const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize.config");

const CriticalAttributesModel = sequelize.define(
  "CriticalAttributes",
  {
    Country: DataTypes.STRING,
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    GlobalDatabaseName: {
      type: DataTypes.STRING,
      field: "Global Database Name",
    },
    LocalDatabaseName: { type: DataTypes.STRING, field: "Local Database Name" },
    MarketNameCode: DataTypes.STRING,
    COMPANY: DataTypes.NUMBER,
    GLOBALBRAND: { type: DataTypes.STRING, field: "GLOBAL BRAND" },
    BRAND: DataTypes.STRING,
    SUBBRAND: DataTypes.STRING,
    VARIANT: DataTypes.STRING,
    TOTAL: DataTypes.STRING,
    CATEGORY_GROUP: { type: DataTypes.STRING, field: "CATEGORY GROUP" },
    CATEGORY: DataTypes.STRING,
    MARKET: DataTypes.STRING,
    SEGMENT: DataTypes.STRING,
    SUB_SEGMENT: { type: DataTypes.STRING, field: "SUB SEGMENT" },
    TYPE: DataTypes.STRING,
    FORMAT: DataTypes.STRING,
    FORM: DataTypes.STRING,
    TARGET_USER: { type: DataTypes.STRING, field: "TARGET USER" },
    CORE_BENEFIT: { type: DataTypes.STRING, field: "CORE BENEFIT" },
    TARGET_AREA: { type: DataTypes.STRING, field: "TARGET AREA" },
    PACK_TYPE: { type: DataTypes.STRING, field: "PACK TYPE" },
    PLATFORM: DataTypes.STRING,
    MACHINE_VS_HAND_WASH: {
      type: DataTypes.STRING,
      field: "MACHINE VS HAND WASH",
    },
    SUBFORMAT: DataTypes.STRING,
    ACTUAL_PACK_SIZE: { type: DataTypes.STRING, field: "ACTUAL PACK SIZE" },
    BASE_PACK_SIZE: { type: DataTypes.STRING, field: "BASE PACK SIZE" },
    NUMBER_IN_PACK: { type: DataTypes.STRING, field: "NUMBER IN PACK" },
    FLAVOUR: DataTypes.STRING,
    MP_VS_NON_MP: { type: DataTypes.STRING, field: "MP VS NON MP" },
    ITEM: DataTypes.STRING,
  },
  {
    tableName: "CriticalAttributes",
    schema: "metadata",
    timestamps: false,
  }
);

module.exports = CriticalAttributesModel;
