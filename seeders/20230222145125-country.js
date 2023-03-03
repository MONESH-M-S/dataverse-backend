'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        name: "India",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "USA",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    return queryInterface.bulkInsert('countries', data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('countries', null, {});
  }
};
