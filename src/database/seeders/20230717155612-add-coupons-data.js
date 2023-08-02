'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const coupons = [
      {
        coupon_type_id: 1, code: "DC-50", value: 50, expiration_time: "2023-08-25 11:59:59"
      },
      {
        coupon_type_id: 1, code: "DC-100", value: 100, expiration_time: "2023-08-15 11:59:59"
      },
      {
        coupon_type_id: 1, code: "DC-200", value: 200, expiration_time: "2023-08-10 11:59:59"
      },
      {
        coupon_type_id: 2, code: "DP-5", value: 5, expiration_time: "2023-08-25 11:59:59"
      },
      {
        coupon_type_id: 2, code: "DP-10", value: 10, expiration_time: "2023-08-15 11:59:59"
      },
      {
        coupon_type_id: 2, code: "DP-20", value: 20, expiration_time: "2023-08-10 11:59:59"
      }
    ];
    await queryInterface.bulkInsert('coupons', coupons)
  },

  async down (queryInterface, Sequelize) {
  }
};
