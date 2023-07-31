'use strict';

const { DataType } = require("sequelize-typescript");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("orders", "tax_price", {
      allowNull: false,
      type: DataType.DECIMAL(10, 2)
    });
  },

  async down (queryInterface, Sequelize) {
  }
};
