'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pick_car_city', {
      city_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      car_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    }, {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    });

    await queryInterface.addConstraint("pick_car_city", {
      fields: ["city_id"],
      type: "foreign key",
      references: {
        table: "cities",
        field: "id"
      },
      name: "pk_pick_car_city_city_id",
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT"
    });

    await queryInterface.addConstraint("pick_car_city", {
      fields: ["car_id"],
      type: "foreign key",
      references: {
        table: "cars",
        field: "id"
      },
      name: "pk_pick_car_city_car_id",
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT"
    });
  },

  async down(queryInterface, Sequelize) {
  }
};
