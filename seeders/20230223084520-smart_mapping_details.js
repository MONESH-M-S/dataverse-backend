'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        "TAG": "P000000000000055184200000000000278416019",
        "UNILEVER_DESC": "UNILEVER PEPSODENT ACTION 123 SIWAK MULTI BENEFIT 1X110G 8999999557447",
        "SKUCODE": 68140578,
        "VENDOR_DESC": "PEPSODENT ACTION 123 SIWAK 72X110G",
        "CATEGORY_GROUP": "Personal Care",
        "CATEGORY": "Oral Care",
        "SEGMENT": "Essential Toothpaste",
        "PRODUCT_FROM_MEDIUM_NAME": "LV9_CH1817",
        "smart_mapping_list_id": "1",
        "DIVISION": "Beauty & Personal Care",
        "MAPPED_STATUS": true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "TAG": "P000000000000055184200000000000278417641",
        "UNILEVER_DESC": "LION WINGS SYSTEMA MENTHOL BREEZE MENTHOL BREEZE FRESHNESS 1X75G",
        "SKUCODE": "XAZX800",
        "VENDOR_DESC": "BREEZE LEMON FRESHNESS SOAP 4X100g",
        "CATEGORY_GROUP": "Personal Care",
        "CATEGORY": "Skin Cleansing",
        "SEGMENT": "Skin Cleansing Bar",
        "PRODUCT_FROM_MEDIUM_NAME": "CH1997",
        "smart_mapping_list_id": "1",
        "DIVISION": "Beauty & Personal Care",
        "MAPPED_STATUS": true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "TAG": "P000000000000055184200000000000278417399",
        "UNILEVER_DESC": "LION WINGS SYSTEMA MENTHOL BREEZE MENTHOL BREEZE FRESHNESS 12X75G",
        "SKUCODE": "XAZX800",
        "VENDOR_DESC": "BREEZE LEMON FRESHNESS SOAP 4X100g",
        "CATEGORY_GROUP": "Personal Care",
        "CATEGORY": "Skin Cleansing",
        "SEGMENT": "Skin Cleansing Bar",
        "PRODUCT_FROM_MEDIUM_NAME": "CH1997",
        "smart_mapping_list_id": "1",
        "DIVISION": "Beauty & Personal Care",
        "MAPPED_STATUS": true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "TAG": "P000000000000055184200000000000278416652",
        "UNILEVER_DESC": "UNILEVER PEPSODENT ACTION 123 SIWAK MULTI BENEFIT 1X160G 8999999552466",
        "SKUCODE": 68670358,
        "VENDOR_DESC": "PEPSODENT ACT123 SIWAK PR 48X(190G+60ML)",
        "CATEGORY_GROUP": "Personal Care",
        "CATEGORY": "Oral Care",
        "SEGMENT": "Essential Toothpaste",
        "PRODUCT_FROM_MEDIUM_NAME": "LV9_CH1817",
        "smart_mapping_list_id": "1",
        "DIVISION": "Beauty & Personal Care",
        "MAPPED_STATUS": false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "TAG": "P000000000000055184000000000000077170300",
        "UNILEVER_DESC": "PEPSODENT PENCEGAH GIGI BERLUBANG TUBE 190 GR+15 GR=205 GR",
        "SKUCODE": 67986924,
        "VENDOR_DESC": "PEPSODENT KIDS SPECIAL GIFT 36X50GR",
        "CATEGORY_GROUP": "Personal Care",
        "CATEGORY": "Oral Care",
        "SEGMENT": "Essential Toothpaste",
        "PRODUCT_FROM_MEDIUM_NAME": "LV9_CH1817",
        "smart_mapping_list_id": "2",
        "DIVISION": "Beauty & Personal Care",
        "MAPPED_STATUS": true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "TAG": "P000000000000055184200000000000278417439",
        "UNILEVER_DESC": "UNILEVER PEPSODENT ACTION 123 CENGKEH MULTI BENEFIT 1X160G 8999999535667",
        "SKUCODE": 67618111,
        "VENDOR_DESC": "PEPSODENT ACTION123 CENGKEH 48X160G",
        "CATEGORY_GROUP": "Personal Care",
        "CATEGORY": "Oral Care",
        "SEGMENT": "Essential Toothpaste",
        "PRODUCT_FROM_MEDIUM_NAME": "LV9_CH1817",
        "smart_mapping_list_id": "2",
        "DIVISION": "Beauty & Personal Care",
        "MAPPED_STATUS": true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "TAG": "P000000000000055184200000000000278415713",
        "UNILEVER_DESC": "UNILEVER PEPSODENT HERBAL HERBAL MULTI BENEFIT 1X190G 8999999708955",
        "SKUCODE": 68827469,
        "VENDOR_DESC": "PEPSODENT HERBAL 48X190G",
        "CATEGORY_GROUP": "Personal Care",
        "CATEGORY": "Oral Care",
        "SEGMENT": "Essential Toothpaste",
        "PRODUCT_FROM_MEDIUM_NAME": "LV9_CH1817",
        "smart_mapping_list_id": "2",
        "DIVISION": "Beauty & Personal Care",
        "MAPPED_STATUS": true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "TAG": "P000000000000055184200000000000278417485",
        "UNILEVER_DESC": "UNILEVER PEPSODENT HERBAL HERBAL MULTI BENEFIT 2X190G 8999999577780",
        "SKUCODE": 20295819,
        "VENDOR_DESC": "PEPSODENT HERBAL PROMO 24X(2X190GR)",
        "CATEGORY_GROUP": "Personal Care",
        "CATEGORY": "Oral Care",
        "SEGMENT": "Essential Toothpaste",
        "PRODUCT_FROM_MEDIUM_NAME": "LV9_CH1817",
        "smart_mapping_list_id": "2",
        "DIVISION": "Beauty & Personal Care",
        "MAPPED_STATUS": true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "TAG": "P000000000000055184200000000000278414850",
        "UNILEVER_DESC": "UNILEVER PEPSODENT ACTION 123 SIWAK MULTI BENEFIT 1X175G 8999999552466",
        "SKUCODE": 68878681,
        "VENDOR_DESC": "PEPSODENT ACTION 123 SIWAK RL 48X175G",
        "CATEGORY_GROUP": "Personal Care",
        "CATEGORY": "Oral Care",
        "SEGMENT": "Essential Toothpaste",
        "PRODUCT_FROM_MEDIUM_NAME": "LV9_CH1817",
        "smart_mapping_list_id": "2",
        "DIVISION": "Beauty & Personal Care",
        "MAPPED_STATUS": true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    return queryInterface.bulkInsert('smart_mapping_details', data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('smart_mapping_details', null, {});
  }
};
