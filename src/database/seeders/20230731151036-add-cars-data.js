"use strict";

const sequelize = require("sequelize");
/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let car_names = [
      "CRV", "Vinfast VF5", "Toyota Camry", "Mercedes-Benz C-Class", "Audi A4", "Honda Accord", "BMW 3 Series", "Lexus RX", "Mazda CX-5", "Ford Ranger",
      "Kia Seltos", "Hyundai Tucson", "Nissan X-Trail", "Chevrolet Cruze", "Subaru Forester", "Volkswagen Golf", "Porsche 911", "Volvo XC60", "Jeep Wrangler",
      "Land Rover Range Rover", "Tesla Model 3", "Ferrari 488", "Rolls-Royce Phantom", "Bentley Bentayga", "Lamborghini Huracan", "Maserati Ghibli", "Jaguar F-Pace",
      "Lotus Elise", "Mini Cooper", "Suzuki Swift", "Aston Martin DB11", "McLaren 720S", "Bugatti Chiron", "Renault Clio", "Peugeot 308", "Citroen C3", "Fiat 500",
      "Alfa Romeo Giulia", "Dodge Charger", "Chrysler 300", "GMC Sierra", "Ram 1500", "Subaru Impreza", "Volvo S90", "Infiniti Q50", "Acura MDX", "Lexus ES",
      "Buick Encore", "Cadillac XT5", "Genesis G80"
    ];
    let car_types = await queryInterface.sequelize.query(`select * from car_types`, { type: sequelize.QueryTypes.SELECT });
    let car_capacities = await queryInterface.sequelize.query(`select * from car_capacities`, { type: sequelize.QueryTypes.SELECT });
    let car_steerings = await queryInterface.sequelize.query(`select * from car_steerings`, { type: sequelize.QueryTypes.SELECT });
    let gas = [40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
    let prices = [500000, 550000, 600000, 650000, 700000, 750000, 800000, 850000, 900000, 950000, 1000000];

    const numberOfCars = 200;
    const cars = [];
    for (let i = 0; i < numberOfCars; i++) {
      const carType = car_types[Math.floor(Math.random() * car_types.length)];
      const carCapacity = car_capacities[Math.floor(Math.random() * car_capacities.length)];
      const carSteering = car_steerings[Math.floor(Math.random() * car_steerings.length)];
      const carName = car_names[Math.floor(Math.random() * car_names.length)];
      const carGasoline = gas[Math.floor(Math.random() * gas.length)];
      const carRentalPrice = prices[Math.floor(Math.random() * prices.length)];
      const carOriginalPrice = prices[Math.floor(Math.random() * prices.length)];

      const carObject = {
        car_type_id: carType.id,
        car_capacity_id: carCapacity.id,
        car_steering_id: carSteering.id,
        car_status_id: 1,
        name: carName,
        gasoline: carGasoline,
        rental_price: carRentalPrice,
        original_price: carOriginalPrice
      };

      cars.push(carObject);
    }
    await queryInterface.bulkInsert("cars", cars);
  },

  async down(queryInterface, Sequelize) {
  }
};
