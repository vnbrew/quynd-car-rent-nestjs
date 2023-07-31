"use strict";

const sequelize = require("sequelize");
/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const pick_car_city = [];
    let allCities = await queryInterface.sequelize.query("SELECT * FROM cities", { type: sequelize.QueryTypes.SELECT });
    let allCars = await queryInterface.sequelize.query("SELECT * FROM cars", { type: sequelize.QueryTypes.SELECT });
    for (let i = 0; i < allCars.length; i++) {
      const randomIndex = Math.floor(Math.random() * allCities.length);
      const city = allCities[randomIndex];
      pick_car_city.push({ city_id: city.id, car_id: allCars.at(i).id });
    }
    await queryInterface.bulkInsert('pick_car_city', pick_car_city);
  },

  async down(queryInterface, Sequelize) {
  }
};
