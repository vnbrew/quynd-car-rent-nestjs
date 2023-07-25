'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("coupon_types", [
      {
        type: "discount_cash",
        description: ""
      },
      {
        type: "discount_percent",
        description: ""
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("coupon_types", {
      type: [
        "discount_cash",
        "discount_percent"
      ]
    });
  }
};
