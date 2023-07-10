import { Sequelize } from 'sequelize-typescript';
import {SEQUELIZE, DEVELOPMENT, PRODUCTION, STAGING, SEQUELIZE_MODELS} from '../constants';
import { databaseConfig } from './database.config';

export const databaseProvider = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        let config;
        switch (process.env.NODE_ENV) {
            case DEVELOPMENT:
                config = databaseConfig.development;
                break;
            case STAGING:
                config = databaseConfig.staging;
                break;
            case PRODUCTION:
                config = databaseConfig.production;
                break;
            default:
                config = databaseConfig.development;
        }
        const sequelize = new Sequelize(config);
        sequelize.addModels([...SEQUELIZE_MODELS]);
        await sequelize.sync();
        return sequelize;
    },
}];