'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.removeConstraint("payments", "fk_payment_statuses_payments");
    // await queryInterface.removeConstraint("payments", "fk_payment_types_payments");
    // await queryInterface.removeConstraint("payments", "fk_rentals_payments");
    // await queryInterface.removeConstraint("payments", "fk_coupons_payments");
    // await queryInterface.dropTable('payment_statuses');
    // await queryInterface.dropTable('payment_types');
    // await queryInterface.dropTable("payments");
    //
    // await queryInterface.removeConstraint('rentals', 'fk_rental_statuses_rentals');
    // await queryInterface.removeConstraint('rentals', 'fk_cars_rentals');
    // await queryInterface.removeConstraint('rentals', 'fk_users_rentals');
    // await queryInterface.dropTable('rental_statuses');
    // await queryInterface.dropTable('rentals');
  },

  async down (queryInterface, Sequelize) {
  }
};
