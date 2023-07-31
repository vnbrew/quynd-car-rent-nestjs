"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("car_types", [
      {
        type: "Sport",
        description: "This is a high-performance sports car."
      },
      {
        type: "SUV",
        description: "A versatile sports vehicle with multi-purpose transportation capabilities."
      },
      {
        type: "MPV",
        description: "A versatile vehicle with the ability to carry multiple passengers and luggage."
      },
      {
        type: "Sedan",
        description: "A car with 4 doors and a separate luggage compartment."
      },
      {
        type: "Coupe",
        description: "A sports car with two doors and typically has a low and sleek design."
      },
      {
        type: "Hatchback",
        description: "A car with a non-separate luggage compartment and a rear hatch that can be opened for access to the luggage compartment."
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("car_types", {
      type: [
        "Sport",
        "SUV",
        "MPV",
        "Sedan",
        "Coupe",
        "Hatchback"
      ]
    });
  }
};
