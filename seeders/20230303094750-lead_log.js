'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data =[
      {
        "PIPELINE_RUN_ID": "2a5983cc-6832-4658-9d21-673132698a19",
        "LOAD_DESC": "PIPE_PROCESS_DATA",
        "LOAD_START_TIME": "2022-08-03 10:43:47.219544",
        "LOAD_END_TIME": "",
        "SOURCE": "Amazon",
        "FILE_NAME": "promo_data_2020.csv",
        "FILE_LAST_MODIFIED_DATE": "",
        "PIPELINE_STATUS": "Running",
        "COUNTRY": "India",
        "RUNNING_USER": "ef326d7aa55f45038577b15055b7084b",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "PIPELINE_RUN_ID": "92140991-1acf-4e05-932f-2c7f30697eb7",
        "LOAD_DESC": "PIPE_PROCESS_DATA",
        "LOAD_START_TIME": "2022-08-03 08:51:39.542528",
        "LOAD_END_TIME": "2022-08-03 08:56:48.927674",
        "SOURCE": "Amazon",
        "FILE_NAME": "Product Catalogue_GB.csv",
        "FILE_LAST_MODIFIED_DATE": "",
        "PIPELINE_STATUS": "Success",
        "COUNTRY": "India",
        "RUNNING_USER": "5aecdd2b76094d178bc2d014d8bc7386",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "PIPELINE_RUN_ID": "bdcfce6e-b5bc-4bbc-8393-101f0d8b18d3",
        "LOAD_DESC": "PIPE_PROCESS_DATA",
        "LOAD_START_TIME": "2022-08-16 09:39:07.268285",
        "LOAD_END_TIME": "",
        "SOURCE": "Nielsen",
        "FILE_NAME": "UL_DeoandFrag_IN_PROD_04082022.csv",
        "FILE_LAST_MODIFIED_DATE": "",
        "COUNTRY": "USA",
        "PIPELINE_STATUS": "Running",
        "RUNNING_USER": "Sandbox",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "PIPELINE_RUN_ID": "28266c44-f90f-4166-a58c-8658f2b33ea9",
        "LOAD_DESC": "PIPE_PROCESS_DATA",
        "LOAD_START_TIME": "2022-08-10 14:42:45.975362",
        "LOAD_END_TIME": "",
        "SOURCE": "Nielsen",
        "COUNTRY": "India",
        "FILE_NAME": "UL_DeoandFrag_IN_PROD_04082022.csv",
        "FILE_LAST_MODIFIED_DATE": "",
        "PIPELINE_STATUS": "Running",
        "RUNNING_USER": "Sandbox",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        "PIPELINE_RUN_ID": "a6c0d24d-b22b-4205-a418-2a74a019ad91",
        "LOAD_DESC": "PIPE_PROCESS_DATA",
        "LOAD_START_TIME": "2022-08-10 13:37:34.920407",
        "LOAD_END_TIME": "2022-08-10 13:59:34.453385",
        "SOURCE": "Nielson",
        "COUNTRY": "India",
        "FILE_NAME": "UL_DeoandFrag_IN_PROD_04082022.csv",
        "FILE_LAST_MODIFIED_DATE": "2022-08-10 09:35:33",
        "PIPELINE_STATUS": "Success",
        "RUNNING_USER": "Sandbox",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    await queryInterface.bulkInsert('LeadLogs', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('LeadLogs', null, {});
  }
};
