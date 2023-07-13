"use strict";
const bcrypt = require("bcryptjs");
const { genSalt } = require("bcrypt");

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await genSalt(10);
    const hashedPassword = await bcrypt.hash("Testing!@#123", salt);
    await queryInterface.bulkInsert("users", [
      {
        email: "quynd@tech.est-rouge.com",
        password: hashedPassword,
        role: "admin",
        name: "Nguyen Duc Quy"
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", {
      email: {
        [Sequelize.Op.in]: ["quyn@tech.est-rouge.com"]
      }
    });
  }
};
