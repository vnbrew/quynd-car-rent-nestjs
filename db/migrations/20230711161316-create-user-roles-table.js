'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user_roles', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            role: {
                allowNull: false,
                type: Sequelize.STRING(20)
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            }
        }, {
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci'
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('user_roles');
    }
};
