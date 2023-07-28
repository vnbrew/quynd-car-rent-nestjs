"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("order_types", [
      {
        type: "cash",
        description: "COD"
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("order_types", {
      type: [
        "cash"
      ]
    });
  }
};
