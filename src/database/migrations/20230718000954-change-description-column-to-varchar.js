'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('rental_statuses', 'description', {
      type: Sequelize.STRING(500),
      defaultValue: '',
      allowNull: true,
    });

    await queryInterface.changeColumn('payment_statuses', 'description', {
      type: Sequelize.STRING(255),
      defaultValue: '',
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('rental_statuses', 'description', {
      type: Sequelize.TEXT,
      defaultValue: null,
      allowNull: true,
    });
    await queryInterface.changeColumn('payment_statuses', 'description', {
      type: Sequelize.TEXT,
      defaultValue: null,
      allowNull: true,
    });
  }
};
