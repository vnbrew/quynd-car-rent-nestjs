"use strict";

const sequelize = require("sequelize");
/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const images = [
      "https://www-asia.nissan-cdn.net/content/dam/Nissan/in/Home/Spotlight/Comparo-300X168.jpg.ximg.l_4_h.smart.jpg",
      "https://www-asia.nissan-cdn.net/content/dam/Nissan/in/Home/Spotlight/Comparo-300X168%20(1)-v1.jpg.ximg.l_4_h.smart.jpg",
      "https://www-asia.nissan-cdn.net/content/dam/Nissan/in/Home/Spotlight/Comparo-300X168%20(1)-v1.jpg.ximg.l_4_h.smart.jpg",
      "https://www-asia.nissan-cdn.net/content/dam/Nissan/in/Home/Spotlight/270-x-151.jpg.ximg.l_4_h.smart.jpg",
      "https://www-asia.nissan-cdn.net/content/dam/Nissan/in/Home/hpi/Magnite_side_400x213-pix-v1.jpg.ximg.l_4_h.smart.jpg"
    ];
    const car_images = [];
    const allCars = await queryInterface.sequelize.query('SELECT * FROM cars', { type: sequelize.QueryTypes.SELECT });
    for (let i = 0; i < allCars.length; i++) {
      for (let j = 0; j < images.length; j++) {
        car_images.push({ car_id: allCars.at(i).id, image_url: images.at(j)})
      }
    }
    await queryInterface.bulkInsert("car_images", car_images)
  },

  async down(queryInterface, Sequelize) {
  }
};
