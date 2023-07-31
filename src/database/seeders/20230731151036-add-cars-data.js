"use strict";

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const cars = [
      {
        car_type_id: 1, car_capacity_id: 1, car_steering_id: 1, car_status_id: 1,
        name: "Rolls - Royce 2019", gasoline: 50, description: "Rolls - Royce 2019",
        rental_price: 100000, original_price: 1200000
      },
      {
        car_type_id: 2, car_capacity_id: 1, car_steering_id: 1, car_status_id: 1,
        name: "Rolls - Royce 2020", gasoline: 50, description: "Rolls - Royce 2020",
        rental_price: 100000, original_price: 1200000
      },
      {
        car_type_id: 3, car_capacity_id: 1, car_steering_id: 1, car_status_id: 1,
        name: "Rolls - Royce 2021", gasoline: 50, description: "Rolls - Royce 2021",
        rental_price: 100000, original_price: 1200000
      },
      {
        car_type_id: 4, car_capacity_id: 1, car_steering_id: 1, car_status_id: 1,
        name: "Rolls - Royce 2022", gasoline: 50, description: "Rolls - Royce 2022",
        rental_price: 100000, original_price: 1200000
      },
      {
        car_type_id: 5, car_capacity_id: 1, car_steering_id: 1, car_status_id: 1,
        name: "Rolls - Royce 2023", gasoline: 50, description: "Rolls - Royce 2023",
        rental_price: 100000, original_price: 1200000
      },
      {
        car_type_id: 6, car_capacity_id: 1, car_steering_id: 1, car_status_id: 1,
        name: "Rolls - Royce 2023 - limited", gasoline: 50, description: "Rolls - Royce 2023 - limited",
        rental_price: 100000, original_price: 1200000
      },
      {
        car_type_id: 1, car_capacity_id: 2, car_steering_id: 1, car_status_id: 1,
        name: "Toyota Camry 2018", gasoline: 50, description: "Toyota Camry 2018",
        rental_price: 50000, original_price: 700000
      },
      {
        car_type_id: 2, car_capacity_id: 2, car_steering_id: 1, car_status_id: 1,
        name: "Toyota Camry 2019", gasoline: 50, description: "Toyota Camry 2019",
        rental_price: 50000, original_price: 700000
      },
      {
        car_type_id: 3, car_capacity_id: 2, car_steering_id: 1, car_status_id: 1,
        name: "Toyota Camry 2020", gasoline: 50, description: "Toyota Camry 2020",
        rental_price: 50000, original_price: 700000
      },
      {
        car_type_id: 4, car_capacity_id: 2, car_steering_id: 1, car_status_id: 1,
        name: "Toyota Camry 2021", gasoline: 50, description: "Toyota Camry 2021",
        rental_price: 50000, original_price: 700000
      },
      {
        car_type_id: 5, car_capacity_id: 2, car_steering_id: 1, car_status_id: 1,
        name: "Toyota Camry 2022", gasoline: 50, description: "Toyota Camry 2022",
        rental_price: 50000, original_price: 700000
      },
      {
        car_type_id: 6, car_capacity_id: 2, car_steering_id: 1, car_status_id: 1,
        name: "Toyota Camry 2023", gasoline: 50, description: "Toyota Camry 2023",
        rental_price: 50000, original_price: 700000
      },
      {
        car_type_id: 1, car_capacity_id: 3, car_steering_id: 1, car_status_id: 1,
        name: "Honda 2018", gasoline: 50, description: "Honda 2018",
        rental_price: 150000, original_price: 1700000
      },
      {
        car_type_id: 2, car_capacity_id: 3, car_steering_id: 1, car_status_id: 1,
        name: "Honda 2019", gasoline: 50, description: "Honda 2019",
        rental_price: 150000, original_price: 1700000
      },
      {
        car_type_id: 3, car_capacity_id: 3, car_steering_id: 1, car_status_id: 1,
        name: "Honda 2020", gasoline: 50, description: "Honda 2020",
        rental_price: 150000, original_price: 1700000
      },
      {
        car_type_id: 4, car_capacity_id: 3, car_steering_id: 1, car_status_id: 1,
        name: "Honda 2021", gasoline: 50, description: "Honda 2021",
        rental_price: 150000, original_price: 1700000
      },
      {
        car_type_id: 5, car_capacity_id: 3, car_steering_id: 1, car_status_id: 1,
        name: "Honda 2022", gasoline: 50, description: "Honda 2022",
        rental_price: 150000, original_price: 1700000
      },
      {
        car_type_id: 6, car_capacity_id: 3, car_steering_id: 1, car_status_id: 1,
        name: "Honda 2023", gasoline: 50, description: "Honda 2023",
        rental_price: 150000, original_price: 1700000
      },
      {
        car_type_id: 1, car_capacity_id: 4, car_steering_id: 1, car_status_id: 1,
        name: "BMW 1", gasoline: 50, description: "BMW 1",
        rental_price: 2000000, original_price: 3000000
      },
      {
        car_type_id: 2, car_capacity_id: 4, car_steering_id: 1, car_status_id: 1,
        name: "BMW 2", gasoline: 50, description: "BMW 2",
        rental_price: 2000000, original_price: 3000000
      },
      {
        car_type_id: 3, car_capacity_id: 4, car_steering_id: 1, car_status_id: 1,
        name: "BMW 3", gasoline: 50, description: "BMW 3",
        rental_price: 2000000, original_price: 3000000
      },
      {
        car_type_id: 4, car_capacity_id: 4, car_steering_id: 1, car_status_id: 1,
        name: "BMW 4", gasoline: 50, description: "BMW 4",
        rental_price: 2000000, original_price: 3000000
      },
      {
        car_type_id: 5, car_capacity_id: 4, car_steering_id: 1, car_status_id: 1,
        name: "BMW 5", gasoline: 50, description: "BMW 5",
        rental_price: 2000000, original_price: 3000000
      },
      {
        car_type_id: 6, car_capacity_id: 4, car_steering_id: 1, car_status_id: 1,
        name: "BMW 6", gasoline: 50, description: "BMW 6",
        rental_price: 2000000, original_price: 3000000
      }
    ]
    await queryInterface.bulkInsert("cars", cars);
  },

  async down(queryInterface, Sequelize) {
  }
};
