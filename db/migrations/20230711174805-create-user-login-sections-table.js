'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user_login_sections', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            login_time: {
                type: Sequelize.DATE,
                allowNull: false
            },
            logout_time: {
                type: Sequelize.DATE,
                allowNull: false
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            }
        }, {
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci'
        });

        await queryInterface.addIndex('user_login_sections', ['user_id'], {
            name: 'pk_users_user_login_sections'
        });

        await queryInterface.addConstraint('user_login_sections', {
            name: 'pk_users_user_login_sections',
            fields: ['user_id'],
            type: 'foreign key',
            references: {
                table: 'users',
                field: 'id'
            },
            onUpdate: 'RESTRICT',
            onDelete: 'CASCADE'
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeConstraint('user_login_sections', 'pk_users_user_login_sections');
        await queryInterface.removeIndex('user_login_sections', 'pk_users_user_login_sections');
        await queryInterface.dropTable('user_login_sections');
    }
};
