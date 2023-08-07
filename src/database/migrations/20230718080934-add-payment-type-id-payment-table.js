"use strict";

const { DataType } = require("sequelize-typescript");
/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("payments", "payment_type_id", {
      type: DataType.INTEGER,
      allowNull: false
    });

    await queryInterface.addConstraint("payments", {
      fields: ["payment_type_id"],
      type: "foreign key",
      name: "fk_payment_types_payments",
      references: {
        table: "payment_types",
        field: "id"
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("payments", "fk_payment_types_payments");
    await queryInterface.removeColumn("payments", "payment_type_id");
  }
};
