"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("car_capacities", [
      { type: "2 Person", description: "Type for 2 Person" },
      { type: "4 Person", description: "Type for 4 Person" },
      { type: "6 Person", description: "Type for 6 Person" },
      { type: "8 or More", description: "Type for 8 or more" },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("car_capacities", {
      type: [
        "2 Person",
        "4 Person",
        "6 Person",
        "8 or More"
      ]
    });
  }
};
