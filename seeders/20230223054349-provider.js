'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        name: "Neilsen",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    return queryInterface.bulkInsert('providers', data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('providers', null, {});
  }
};
