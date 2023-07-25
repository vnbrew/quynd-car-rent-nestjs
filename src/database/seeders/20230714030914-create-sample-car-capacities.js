"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("car_capacities", [
      { type: "2 Person", description: "Loại xe 2 chổ ngồi." },
      { type: "4 Person", description: "Loại xe 4 chổ ngồi." },
      { type: "6 Person", description: "Loại xe 6 chổ ngồi." },
      { type: "8 or More", description: "Loại xe trên 8 chổ ngồi." },
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
