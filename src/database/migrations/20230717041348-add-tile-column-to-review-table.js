"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("reviews", "title", {
      type: Sequelize.STRING,
      defaultValue: "",
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("reviews", "title");
  }
};
