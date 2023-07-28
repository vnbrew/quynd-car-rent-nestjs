'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn("orders", "pay_date_time", "paid_date_time");
  },

  async down (queryInterface, Sequelize) {
  }
};
