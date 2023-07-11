'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('user_roles', [{
            id: 1,
            role: 'Admin',
            description: 'Admins of system'
        }, {
            id: 2,
            role: 'Customer',
            description: 'Customers of system'
        }], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('user_roles', null, {});
    }
};
