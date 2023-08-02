"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("car_images", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      car_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      image_url: {
        allowNull: true,
        type: Sequelize.STRING(120),
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
      engine: "InnoDB",
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci"
    });

    await queryInterface.addIndex("car_images", ["car_id"], {
      name: "car_id_index"
    });

    await queryInterface.addConstraint("car_images", {
      fields: ["car_id"],
      type: "foreign key",
      references: {
        table: "cars",
        field: "id"
      },
      name: "pk_car_car_images",
      onDelete: "CASCADE",
      onUpdate: "RESTRICT"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("car_images", "pk_car_car_images");
    await queryInterface.removeIndex("car_images", "car_id_index");
    await queryInterface.dropTable("car_images");
  }
};
