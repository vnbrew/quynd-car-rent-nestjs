'use strict';

const { DataType } = require("sequelize-typescript");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("orders", "billing_id", {
      type: DataType.INTEGER,
      allowNull: false
    });

    await queryInterface.addConstraint("orders", {
      fields: ["billing_id"],
      type: "foreign key",
      name: "fk_billing_info_orders",
      references: {
        table: "billing_info",
        field: "id"
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT"
    });
  },

  async down (queryInterface, Sequelize) {
  }
};
