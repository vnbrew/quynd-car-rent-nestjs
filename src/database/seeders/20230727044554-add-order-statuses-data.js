'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("order_statuses", [
      {
        status: "order",
        description: "order"
      },
      {
        status: "paid",
        description: "paid"
      },
      {
        status: "cancel",
        description: "cancel"
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("order_statuses", {
      status: [
        "order",
        "paid",
        "cancel"
      ]
    });
  }
};
