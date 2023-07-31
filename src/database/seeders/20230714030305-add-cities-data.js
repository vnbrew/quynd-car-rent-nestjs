"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const cities = [
      {
        city: "Ha Noi city"
      },
      {
        city: "Ho Chi Minh city",
      },
      {
        city: "Da Nang city",
      },
      {
        city: "Hai Phong city",
      },
      {
        city: "Can Tho city",
      }
    ];
    await queryInterface.bulkInsert("cities", cities);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("cities", {
      city: {
        [Sequelize.Op.in]: [
          "Hai Noi city",
          "Ho Chi Minh city",
          "Da Nang city",
          "Hai Phong city",
          "Can Tho city"
        ]
      }
    });
  }
};
