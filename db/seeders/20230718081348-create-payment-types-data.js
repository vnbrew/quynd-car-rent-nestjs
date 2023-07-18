"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("payment_types", [
      {
        type: "cash",
        description: ""
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("payment_types", {
      type: [
        "cash"
      ]
    });
  }
};
