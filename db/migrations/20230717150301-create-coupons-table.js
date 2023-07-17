"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('coupons', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      coupon_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
      },
      value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      expiration_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    }, {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    });

    await queryInterface.addConstraint("coupons", {
      fields: ["coupon_type_id"],
      type: "foreign key",
      name: "fk_coupon_types_coupon",
      references: {
        table: "coupon_types",
        field: "id"
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("coupons", "fk_coupon_types_coupon");
    await queryInterface.dropTable("coupons");
  }
};
