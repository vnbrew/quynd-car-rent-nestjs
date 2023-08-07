"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_tokens", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      token: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      expiration_time: {
        type: Sequelize.DATE,
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

    await queryInterface.addIndex("user_tokens", ["token"], {
      name: "token_index"
    });

    await queryInterface.addIndex("user_tokens", ["user_id"], {
      name: "pk_users_user_tokens"
    });

    await queryInterface.addConstraint("user_tokens", {
      name: "pk_users_user_tokens",
      fields: ["user_id"],
      type: "foreign key",
      references: {
        table: "users",
        field: "id"
      },
      onUpdate: "RESTRICT",
      onDelete: "CASCADE"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("user_tokens", "token_index");
    await queryInterface.removeConstraint("user_tokens", "pk_users_user_tokens");
    await queryInterface.removeIndex("user_tokens", "pk_users_user_tokens");
    await queryInterface.dropTable("user_tokens");
  }
};
