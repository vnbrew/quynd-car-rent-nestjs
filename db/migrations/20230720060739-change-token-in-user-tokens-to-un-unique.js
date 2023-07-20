"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeIndex('user_tokens', 'user_id');
  },

  async down(queryInterface, Sequelize) {
  }
};
