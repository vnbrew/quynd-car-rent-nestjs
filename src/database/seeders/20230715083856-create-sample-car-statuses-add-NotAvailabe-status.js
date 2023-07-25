"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("car_statuses", [
      {
        status: "NotAvailable",
        description: "Car is not enough information"
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("car_statuses", {
      type: [
        "NotAvailable"
      ]
    });
  }
};
