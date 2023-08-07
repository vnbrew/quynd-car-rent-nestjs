"use strict";

const { DataType } = require("sequelize-typescript");
/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("orders", "amount", "total");
    await queryInterface.addColumn("orders", "subtotal", {
      allowNull: false,
      type: DataType.DECIMAL(10, 2)
    });
    await queryInterface.addColumn("orders", "discount", {
      allowNull: false,
      type: DataType.DECIMAL(10, 2)
    });
  },

  async down(queryInterface, Sequelize) {
  }
};
