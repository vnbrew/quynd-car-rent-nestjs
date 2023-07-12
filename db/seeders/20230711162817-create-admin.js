'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('users', [
            {
                email: 'admin@carrent.com',
                password: 'abc123!@#',
                role: 'Admin',
                name: 'Admin'
            },
            {
                email: 'quyn@tech.est-rouge.com',
                password: 'abc123!@#',
                role: 'Admin',
                name: 'Nguyen Duc Quy'
            }
        ])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users', {
            email: {
                [Sequelize.Op.in]: ['admin@carrent.com', 'quyn@tech.est-rouge.com']
            }
        });
    }
};
