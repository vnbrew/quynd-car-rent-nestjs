'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('orders', 'pay_date_time')
  },

  async down (queryInterface, Sequelize) {
  }
};
