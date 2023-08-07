'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("reviews", [
      {
        car_id: 1,
        user_id: 2,
        rate: 5,
        comment: "Good Service",
        title: "Good"
      }
    ])
    await queryInterface.bulkInsert("favorites", [
      {
        car_id: 1,
        user_id: 2,
        status: 1
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
