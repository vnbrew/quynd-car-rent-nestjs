"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      role: {
        type: Sequelize.ENUM("Admin", "Customer"),
        allowNull: false,
        defaultValue: "Customer"
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(255),
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
      image_url: {
        type: Sequelize.STRING(100),
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

    await queryInterface.addIndex("users", ["name", "email"], { name: "name_email_index" });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("users", "name_email_index");
    await queryInterface.dropTable("users");
  }
};
