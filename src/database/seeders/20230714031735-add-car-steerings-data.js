"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("car_steerings", [
      {
        type: "Manual",
        description: "Manual"
      },
      {
        type: "Electric",
        description: "Electric"
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("car_steerings", {
      type: [
        "Manual",
        "Electric"
      ]
    });
  }
};
