'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("payment_statuses", [
      {
        status: "success",
        description: ""
      },
      {
        status: "failure",
        description: ""
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("payment_statuses", {
      status: [
        "success",
        "failure"
      ]
    });
  }
};
