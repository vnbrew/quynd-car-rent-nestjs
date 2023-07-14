"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("car_steerings", [
      {
        type: "Manual",
        description: "Steering system that uses mechanical components for control."
      },
      {
        type: "Electric Power",
        description: "Steering system that utilizes an electric module for assistance."
      },
      {
        type: "Hydraulic Power",
        description: "Steering system that utilizes hydraulic fluid for enhanced force."
      },
      {
        type: "Electronic",
        description: "Steering system that utilizes an electric motor for assistance."
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("car_steerings", {
      type: [
        "Manual",
        "Electric Power",
        "Hydraulic Power",
        "Electronic"
      ]
    });
  }
};
