'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        "data_provider": "Nielsan",
        "category": "Beauty & Personal Care",
        "country": "India",
        "file_name": "UI_Hair_TR_Prod_07222202.csv",
        "file_extension": "csv",
        "mapped_record_count": "896",
        "unmapped_record_count": "10",
        "confidence_level_less_than_70": "800",
        "confidence_level_50_70": "50",
        "confidence_level_less_than_50": "46",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "data_provider": "Nielsan",
        "category": "Beauty & Personal Care",
        "country": "India",
        "file_name": "UI_Hair_TR_Prod_07222202.csv",
        "file_extension": "csv",
        "mapped_record_count": "900",
        "unmapped_record_count": "50",
        "confidence_level_less_than_70": "600",
        "confidence_level_50_70": "200",
        "confidence_level_less_than_50": "100",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    return queryInterface.bulkInsert('smart_mapping_lists', data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('smart_mapping_lists', null, {});
  }
};


