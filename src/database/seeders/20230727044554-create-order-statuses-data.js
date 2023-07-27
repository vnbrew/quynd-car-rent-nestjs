'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("order_statuses", [
      {
        status: "success",
        description: "Success"
      },
      {
        status: "failure",
        description: "Failure"
      },
      {
        status: "processing",
        description: "In processing"
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("order_statuses", {
      status: [
        "success",
        "failure"
      ]
    });
  }
};
