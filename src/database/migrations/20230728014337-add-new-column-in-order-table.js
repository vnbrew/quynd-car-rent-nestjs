'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn("orders", "pay_date_time", {
      type: Sequelize.DATE,
      allowNull: true
    });

    await queryInterface.addColumn("orders", "order_date_time", {
      type: Sequelize.DATE,
      allowNull: true
    });

    await queryInterface.addColumn("orders", "cancel_date_time", {
      type: Sequelize.DATE,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
  }
};
