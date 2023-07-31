"use strict";

const sequelize = require("sequelize");
/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const drop_car_city = [];
    let allCities = await queryInterface.sequelize.query("SELECT * FROM cities", { type: sequelize.QueryTypes.SELECT });
    let allCars = await queryInterface.sequelize.query("SELECT * FROM cars", { type: sequelize.QueryTypes.SELECT });
    for (let i = 0; i < allCars.length; i++) {
      for (let j = 0; j < allCities.length; j++) {
        drop_car_city.push({ city_id: allCities.at(j).id, car_id: allCars.at(i).id });
      }
    }
    await queryInterface.bulkInsert('drop_car_city', drop_car_city);
  },

  async down(queryInterface, Sequelize) {
  }
};
