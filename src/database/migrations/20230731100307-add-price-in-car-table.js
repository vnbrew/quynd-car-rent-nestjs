'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("cars", "rental_price", {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    });

    await queryInterface.addColumn("cars", "original_price", {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    });

    await queryInterface.addColumn("cars", "locked", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });
  },

  async down (queryInterface, Sequelize) {
  }
};
