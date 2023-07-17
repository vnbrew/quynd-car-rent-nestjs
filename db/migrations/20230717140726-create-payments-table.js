"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("payments", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      rental_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      payment_status_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      tax: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      pay_date_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
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

    await queryInterface.addConstraint("payments", {
      fields: ["rental_id"],
      type: "foreign key",
      name: "fk_rentals_payments",
      references: {
        table: "rentals",
        field: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "RESTRICT"
    });
    await queryInterface.addConstraint("payments", {
      fields: ["payment_status_id"],
      type: "foreign key",
      name: "fk_payment_statuses_payments",
      references: {
        table: "payment_statuses",
        field: "id"
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("payments", "fk_payment_statuses_payments");
    await queryInterface.removeConstraint("payments", "fk_rentals_payments");
    await queryInterface.dropTable("payments");
  }
};
