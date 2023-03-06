'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LeadLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PIPELINE_RUN_ID: {
        type: Sequelize.STRING
      },
      COUNTRY: {
        type: Sequelize.STRING
      },
      LOAD_DESC: {
        type: Sequelize.STRING
      },
      LOAD_START_TIME: {
        type: Sequelize.STRING
      },
      LOAD_END_TIME: {
        type: Sequelize.STRING
      },
      SOURCE: {
        type: Sequelize.STRING
      },
      FILE_NAME: {
        type: Sequelize.STRING
      },
      FILE_LAST_MODIFIED_DATE: {
        type: Sequelize.STRING
      },
      PIPELINE_STATUS: {
        type: Sequelize.STRING
      },
      RUNNING_USER: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('LeadLogs');
  }
};