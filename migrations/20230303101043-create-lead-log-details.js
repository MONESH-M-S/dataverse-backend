'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LeadLogDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PIPELINE_RUN_ID: {
        type: Sequelize.STRING
      },
      FILE_NAME: {
        type: Sequelize.STRING
      },
      TASK_NAME: {
        type: Sequelize.STRING
      },
      STEP_NUMBER: {
        type: Sequelize.STRING
      },
      LOG_DATE: {
        type: Sequelize.STRING
      },
      MESSAGE_TYPE: {
        type: Sequelize.STRING
      },
      LOG_MESSAGE: {
        type: Sequelize.TEXT
      },
      ROW_COUNT: {
        type: Sequelize.STRING
      },
      ERROR_CODE: {
        type: Sequelize.STRING
      },
      ERROR_DESC: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('LeadLogDetails');
  }
};