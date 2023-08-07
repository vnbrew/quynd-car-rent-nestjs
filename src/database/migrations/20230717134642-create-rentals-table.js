"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("rentals", {
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
      rental_status_id: {
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

    await queryInterface.addConstraint("rentals", {
      fields: ["rental_status_id"],
      type: "foreign key",
      name: "fk_rental_statuses_rentals",
      references: {
        table: "rental_statuses",
        field: "id"
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT"
    });

    await queryInterface.addConstraint("rentals", {
      fields: ["car_id"],
      type: "foreign key",
      name: "fk_cars_rentals",
      references: {
        table: "cars",
        field: "id"
      },
      onUpdate: "RESTRICT",
      onDelete: "CASCADE"
    });

    await queryInterface.addConstraint("rentals", {
      fields: ["user_id"],
      type: "foreign key",
      name: "fk_users_rentals",
      references: {
        table: "users",
        field: "id"
      },
      onUpdate: "RESTRICT",
      onDelete: "CASCADE"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('rentals', 'fk_rental_statuses_rentals');
    await queryInterface.removeConstraint('rentals', 'fk_cars_rentals');
    await queryInterface.removeConstraint('rentals', 'fk_users_rentals');
    await queryInterface.dropTable('rentals');
  }
};
