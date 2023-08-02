'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.dropTable("order_types");
    await queryInterface.removeConstraint('rentals', 'fk_rental_statuses_rentals');
    await queryInterface.removeConstraint('rentals', 'fk_cars_rentals');
    await queryInterface.removeConstraint('rentals', 'fk_users_rentals');


    await queryInterface.removeConstraint("payments", "fk_payment_statuses_payments");
    await queryInterface.removeConstraint("payments", "fk_payment_types_payments");
    await queryInterface.removeConstraint("payments", "fk_rentals_payments");
    await queryInterface.removeConstraint("payments", "fk_coupons_payments");

    await queryInterface.dropTable('rental_statuses');
    await queryInterface.dropTable("rentals");

    await queryInterface.dropTable("payments");
    await queryInterface.dropTable("payment_statuses");
    await queryInterface.dropTable("offices");

    await queryInterface.removeConstraint("car_prices", "pk_car_car_prices");
    await queryInterface.removeIndex("car_prices", "car_id_index");
    await queryInterface.dropTable("car_prices");
  },

  async down (queryInterface, Sequelize) {
  }
};
