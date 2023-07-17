'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("rental_statuses", [
      {
        status: "effective_state",
        description: "This is the state when the car rental contract has been signed, and the parties have agreed upon its terms and conditions. In this state, the contract is legally effective, and the commitments regarding the car rental and accompanying conditions have been established"
      },
      {
        status: "rental_state",
        description: "When the contract is in the rental state, the renter has received the car and started using it. In this state, the renter is responsible for maintaining the car and adhering to the agreed-upon regulations outlined in the contract."
      },
      {
        status: "return_state",
        description: "This is the state when the car rental contract ends, and the renter returns the car to the owner or rental company. In this state, both parties will perform a vehicle inspection to ensure there are no significant damages or losses to the car."
      },
      {
        status: "issues_dispute_state",
        description: "In some cases, disputes or issues related to the car rental may arise, such as car damage, contract violations, or disputes regarding monetary amounts. When there is a dispute, the car rental contract may enter this state, and the parties will need to agree or engage in dispute resolution processes to address the issue."
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("rental_statuses", {
      status: [
        "effective_state",
        "rental_state",
        "return_state",
        "issues_dispute_state"
      ]
    });
  }
};
