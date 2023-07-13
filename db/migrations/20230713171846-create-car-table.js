'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('cars', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            office_id: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            car_type_id: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            car_capacity_id: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            car_steering_id: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            car_status_id: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING(255)
            },
            gasoline: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            description: {
                allowNull: true,
                type: Sequelize.TEXT
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('current_timestamp')
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('current_timestamp')
            }
        }, {
            engine: 'InnoDB',
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci'
        });

        await queryInterface.addIndex('cars', ['name'], {
            name: 'name_index',
            indexType: 'BTREE'
        });
        await queryInterface.addIndex('cars', ['gasoline'], {
            name: 'gasoline_index',
            indexType: 'BTREE'
        });
        await queryInterface.addIndex('cars', ['car_steering_id'], {
            indexName: 'pk_car_steerings_cars',
            indexType: 'BTREE'
        });
        await queryInterface.addIndex('cars', ['car_status_id'], {
            indexName: 'pk_car_statuses_cars',
            indexType: 'BTREE'
        });
        await queryInterface.addIndex('cars', ['office_id'], {
            indexName: 'pk_offices_cars',
            indexType: 'BTREE'
        });
        await queryInterface.addIndex('cars', ['car_type_id'], {
            indexName: 'pk_car_types_cars',
            indexType: 'BTREE'
        });
        await queryInterface.addIndex('cars', ['car_capacity_id'], {
            indexName: 'pk_car_capacities_cars',
            indexType: 'BTREE'
        });

        await queryInterface.addConstraint('cars', {
            fields: ['car_steering_id'],
            type: 'foreign key',
            references: {
                table: 'car_steerings',
                field: 'id'
            },
            name: 'pk_car_steerings_cars'
        });
        await queryInterface.addConstraint('cars', {
            fields: ['car_status_id'],
            type: 'foreign key',
            references: {
                table: 'car_statuses',
                field: 'id'
            },
            name: 'pk_car_statuses_cars'
        });
        await queryInterface.addConstraint('cars', {
            fields: ['office_id'],
            type: 'foreign key',
            references: {
                table: 'offices',
                field: 'id'
            },
            name: 'pk_offices_cars'
        });
        await queryInterface.addConstraint('cars', {
            fields: ['car_type_id'],
            type: 'foreign key',
            references: {
                table: 'car_types',
                field: 'id'
            },
            name: 'pk_car_types_cars'
        });
        await queryInterface.addConstraint('cars', {
            fields: ['car_capacity_id'],
            type: 'foreign key',
            references: {
                table: 'car_capacities',
                field: 'id'
            },
            name: 'pk_car_capacities_cars'
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeConstraint('cars', 'pk_car_capacities_cars');
        await queryInterface.removeConstraint('cars', 'pk_car_types_cars');
        await queryInterface.removeConstraint('cars', 'pk_offices_cars');
        await queryInterface.removeConstraint('cars', 'pk_car_statuses_cars');
        await queryInterface.removeConstraint('cars', 'pk_car_steerings_cars');
        await queryInterface.removeIndex('cars', 'pk_car_capacities_cars');
        await queryInterface.removeIndex('cars', 'pk_car_types_cars');
        await queryInterface.removeIndex('cars', 'pk_offices_cars');
        await queryInterface.removeIndex('cars', 'pk_car_statuses_cars');
        await queryInterface.removeIndex('cars', 'pk_car_steerings_cars');
        await queryInterface.removeIndex('cars', 'gasoline_index');
        await queryInterface.removeIndex('cars', 'name_index');
        await queryInterface.dropTable('cars');
    }
};
