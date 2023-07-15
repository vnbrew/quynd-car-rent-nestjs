"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("car_prices", {
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
      status: {
        allowNull: false,
        type: Sequelize.ENUM("old", "new"),
        defaultValue: "new"
      },
      rental_price: {
        allowNull: true,
        type: Sequelize.DECIMAL(10, 2)
      },
      original_price: {
        allowNull: true,
        type: Sequelize.DECIMAL(10, 2)
      },
      from_date_time: {
        allowNull: true,
        type: Sequelize.DATE
      },
      to_date_time: {
        allowNull: true,
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
      }
    }, {
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci"
    });

    await queryInterface.addIndex("car_prices", ["car_id"], {
      name: "car_id_index"
    });

    await queryInterface.addConstraint("car_prices", {
      fields: ["car_id"],
      type: "foreign key",
      references: {
        table: "cars",
        field: "id"
      },
      name: "car_id_pk"
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint("car_prices", "car_id_pk");
    await queryInterface.removeIndex("car_prices", "car_id_index");
    await queryInterface.dropTable("car_prices");
  }
};
