const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");
const SmartMappingDetailsModel = require("./smartMappingDetails.model");

const SmartMappingListModel = sequelize.define('smart_mapping_list', {
    data_provider: DataTypes.STRING,
    category: DataTypes.STRING,
    file_name: DataTypes.STRING,
    country: DataTypes.STRING,
    file_extension: DataTypes.STRING,
    mapped_record_count: DataTypes.STRING,
    unmapped_record_count: DataTypes.STRING,
    confidence_level_less_than_70: DataTypes.STRING,
    confidence_level_50_70: DataTypes.STRING,
    confidence_level_less_than_50: DataTypes.STRING,
});

SmartMappingListModel.hasOne(SmartMappingDetailsModel, {
    foreignKey: "smart_mapping_list_id",
    sourceKey: "id",
  });

module.exports = SmartMappingListModel
