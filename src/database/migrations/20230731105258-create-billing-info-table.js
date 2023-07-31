'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("billing_info", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      city: {
        type: Sequelize.STRING(100),
        defaultValue: ""
      },
      address: {
        type: Sequelize.STRING(100),
        defaultValue: ""
      },
      phone_number: {
        type: Sequelize.STRING(30),
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

    await queryInterface.addConstraint("billing_info", {
      fields: ["user_id"],
      type: "foreign key",
      references: {
        table: "users",
        field: "id"
      },
      name: "pk_billing_info_user_id",
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT"
    });
  },

  async down (queryInterface, Sequelize) {
  }
};
