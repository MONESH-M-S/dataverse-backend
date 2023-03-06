'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const data = [
      {
        "PIPELINE_RUN_ID": "2a5983cc-6832-4658-9d21-673132698a19",
        "FILE_NAME": "Product Catalogue_GB.csv.csv",
        "TASK_NAME": "LKP_IF_PROCESSED",
        "STEP_NUMBER": "4",
        "LOG_DATE": "47:41.6",
        "MESSAGE_TYPE": "S",
        "LOG_MESSAGE": "File has not been processed earlier. ",
        "ROW_COUNT": "0",
        "ERROR_CODE": "NULL",
        "ERROR_DESC": "NULL",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "PIPELINE_RUN_ID": "92140991-1acf-4e05-932f-2c7f30697eb7",
        "FILE_NAME": "UL_DeoandFrag_IN_PROD_04082022.csv",
        "TASK_NAME": "NB_RD_ANALYSIS",
        "STEP_NUMBER": "6",
        "LOG_DATE": "37:14.8",
        "MESSAGE_TYPE": "S",
        "LOG_MESSAGE": "Records_Received",
        "ROW_COUNT": "366",
        "ERROR_CODE": "NULL",
        "ERROR_DESC": "NULL",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "PIPELINE_RUN_ID": "bdcfce6e-b5bc-4bbc-8393-101f0d8b18d3",
        "FILE_NAME": "UL_DeoandFrag_IN_PROD_04082022.csv",
        "TASK_NAME": "LKP_FILE_LIST",
        "STEP_NUMBER": "3",
        "LOG_DATE": "48:39.1",
        "MESSAGE_TYPE": "S",
        "LOG_MESSAGE": "LKP_FILE_LIST Successful",
        "ROW_COUNT": "0",
        "ERROR_CODE": "NULL",
        "ERROR_DESC": "NULL",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "PIPELINE_RUN_ID": "28266c44-f90f-4166-a58c-8658f2b33ea9",
        "FILE_NAME": "UL_DeoandFrag_IN_PROD_04082022.csv.csv",
        "TASK_NAME": "NB_RD_PROCESS",
        "STEP_NUMBER": "6",
        "LOG_DATE": "52:49.5",
        "MESSAGE_TYPE": "E",
        "LOG_MESSAGE": "NB_RD_PROCESS Failed",
        "ROW_COUNT": "0",
        "ERROR_CODE": "3204",
        "ERROR_DESC": "Databricks execution failed with error state Terminated. For more details please check the run page url: https://adb-3708176629859287.7.azuredatabricks.net/?o=3708176629859287#job/1036182930673482/run/468507.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "PIPELINE_RUN_ID": "a6c0d24d-b22b-4205-a418-2a74a019ad91",
        "FILE_NAME": "NULL",
        "TASK_NAME": "NB_LOAD_LOG",
        "STEP_NUMBER": "1",
        "LOG_DATE": "41:10.6",
        "MESSAGE_TYPE": "I",
        "LOG_MESSAGE": "NB_LOAD_LOG Initiated",
        "ROW_COUNT": "0",
        "ERROR_CODE": "NULL",
        "ERROR_DESC": "NULL",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('LeadLogDetails', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('LeadLogDetails', null, {});
  }
};
