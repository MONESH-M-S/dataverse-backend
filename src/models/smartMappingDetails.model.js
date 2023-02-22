const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const SmartMappingDetailsModel = sequelize.define('smart_mapping_details', {
    TAG: DataTypes.STRING,
    EXTERNAL_DESC: DataTypes.STRING,
    SKUCODE: DataTypes.STRING,
    DATA_PROVIDER: DataTypes.STRING,
    CATEGORY: DataTypes.STRING,
    FILE_NAME: DataTypes.STRING,
    CONFIDENCE_LEVEL: DataTypes.STRING,
    DIVISION: DataTypes.STRING,
    CATEGORY_GROUP: DataTypes.STRING,
});

module.exports = SmartMappingDetailsModel
