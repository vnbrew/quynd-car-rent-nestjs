'use strict';

const { DataType } = require("sequelize-typescript");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeIndex("users", "name_email_index");
    await queryInterface.removeIndex("user_tokens", "token_index");
  },

  async down (queryInterface, Sequelize) {
  }
};
