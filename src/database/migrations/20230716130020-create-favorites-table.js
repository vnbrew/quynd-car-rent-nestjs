"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("favorites", {
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
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
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

    await queryInterface.addIndex("favorites", ["car_id"], {
      name: "car_id_index"
    });
    await queryInterface.addIndex("favorites", ["user_id"], {
      name: "user_id_index"
    });
    await queryInterface.addConstraint("favorites", {
      fields: ["car_id"],
      type: "foreign key",
      references: {
        table: "cars",
        field: "id"
      },
      name: "pk_cars_favorites",
      onDelete: "CASCADE",
      onUpdate: "RESTRICT"
    });

    await queryInterface.addConstraint("favorites", {
      fields: ["user_id"],
      type: "foreign key",
      references: {
        table: "users",
        field: "id"
      },
      name: "pk_users_favorites",
      onDelete: "CASCADE",
      onUpdate: "RESTRICT"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("favorites", "pk_cars_favorites");
    await queryInterface.removeConstraint("favorites", "pk_users_favorites");
    await queryInterface.removeIndex("favorites", "car_id_index");
    await queryInterface.removeIndex("favorites", "user_id_index");
    await queryInterface.dropTable("favorites");
  }
};
