"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      car_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      order_status_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      order_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      coupon_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      pick_date_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      drop_date_time: {
        type: Sequelize.DATE,
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
      detail: {
        type: Sequelize.TEXT,
        defaultValue: ""
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

    await queryInterface.addConstraint("orders", {
      fields: ["order_type_id"],
      type: "foreign key",
      name: "fk_order_types_orders",
      references: {
        table: "order_types",
        field: "id"
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT"
    });

    await queryInterface.addConstraint("orders", {
      fields: ["order_status_id"],
      type: "foreign key",
      name: "fk_order_statuses_orders",
      references: {
        table: "order_statuses",
        field: "id"
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT"
    });

    await queryInterface.addConstraint("orders", {
      fields: ["coupon_id"],
      type: "foreign key",
      name: "fk_coupons_orders",
      references: {
        table: "coupons",
        field: "id"
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT"
    });

    await queryInterface.addConstraint("orders", {
      fields: ["car_id"],
      type: "foreign key",
      name: "fk_cars_orders",
      references: {
        table: "cars",
        field: "id"
      },
      onUpdate: "RESTRICT",
      onDelete: "CASCADE"
    });

    await queryInterface.addConstraint("orders", {
      fields: ["user_id"],
      type: "foreign key",
      name: "fk_users_orders",
      references: {
        table: "users",
        field: "id"
      },
      onUpdate: "RESTRICT",
      onDelete: "CASCADE"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('orders', 'fk_order_types_orders');
    await queryInterface.removeConstraint('orders', 'fk_order_statuses_orders');
    await queryInterface.removeConstraint('orders', 'fk_coupons_orders');
    await queryInterface.removeConstraint('orders', 'fk_cars_orders');
    await queryInterface.removeConstraint('orders', 'fk_users_orders');
    await queryInterface.dropTable('orders');
  }
};
