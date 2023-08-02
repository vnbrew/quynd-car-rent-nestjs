'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("order_status_history", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      order_status_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
      }
    }, {
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci"
    });

    await queryInterface.addConstraint("order_status_history", {
      fields: ["order_id"],
      type: "foreign key",
      references: {
        table: "orders",
        field: "id"
      },
      name: "pk_order_status_history_order_id",
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT"
    });

    await queryInterface.addConstraint("order_status_history", {
      fields: ["order_status_id"],
      type: "foreign key",
      references: {
        table: "order_statuses",
        field: "id"
      },
      name: "pk_order_status_history_order_status_id",
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT"
    });
  },

  async down (queryInterface, Sequelize) {
  }
};
