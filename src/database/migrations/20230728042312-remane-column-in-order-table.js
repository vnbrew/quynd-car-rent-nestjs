'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('orders', 'fk_order_types_orders');
    await queryInterface.renameColumn("orders", "order_type_id", "payment_type_id");
    await queryInterface.addConstraint("orders", {
      fields: ["payment_type_id"],
      type: "foreign key",
      name: "fk_payment_types_orders",
      references: {
        table: "payment_types",
        field: "id"
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT"
    });
  },

  async down (queryInterface, Sequelize) {
  }
};
