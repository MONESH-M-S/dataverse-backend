const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const SmartMappingDetailsModel = sequelize.define('smart_mapping_details', {
    TAG: DataTypes.STRING,
    UNILEVER_DESC: DataTypes.STRING,
    VENDOR_DESC: DataTypes.STRING,
    SKUCODE: DataTypes.STRING,
    CATEGORY: DataTypes.STRING,
    DIVISION: DataTypes.STRING,
    CATEGORY_GROUP: DataTypes.STRING,
    SEGMENT: DataTypes.STRING,
    PRODUCT_FROM_MEDIUM_NAME: DataTypes.STRING,
    MAPPED_STATUS: DataTypes.BOOLEAN,
    BRAND_FROM_NAME: DataTypes.STRING   
});

module.exports = SmartMappingDetailsModel
