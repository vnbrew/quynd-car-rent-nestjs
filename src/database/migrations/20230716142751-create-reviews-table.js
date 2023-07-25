"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("reviews", {
      car_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      rate: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true
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

    await queryInterface.addConstraint("reviews", {
      fields: ["car_id"],
      type: "foreign key",
      references: {
        table: "cars",
        field: "id"
      },
      name: "pk_reviews_car_id",
      onDelete: "CASCADE",
      onUpdate: "RESTRICT"
    });

    await queryInterface.addConstraint("reviews", {
      fields: ["user_id"],
      type: "foreign key",
      references: {
        table: "users",
        field: "id"
      },
      name: "pk_reviews_user_id",
      onDelete: "CASCADE",
      onUpdate: "RESTRICT"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("reviews", "pk_reviews_car_id");
    await queryInterface.removeConstraint("reviews", "pk_reviews_user_id");
    await queryInterface.dropTable("reviews");
  }
};
