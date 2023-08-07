'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeConstraint("cars", "pk_offices_cars");
    await queryInterface.removeIndex("cars", "pk_offices_cars");
    await queryInterface.removeColumn('cars', 'office_id')
  },

  async down (queryInterface, Sequelize) {
  }
};
