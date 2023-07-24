import { Sequelize } from "sequelize-typescript";
import { SEQUELIZE, SEQUELIZE_MODELS } from "../constants";
import { databaseConfig } from "./database.config";
import { SequelizeOptions } from "sequelize-typescript/dist/sequelize/sequelize/sequelize-options";

export const databaseProvider = [{
  provide: SEQUELIZE,
  useFactory: async () => {
    let config = databaseConfig.config as SequelizeOptions;
    const sequelize = new Sequelize(config);
    sequelize.addModels([...SEQUELIZE_MODELS]);
    // await sequelize.sync({ force: false });
    return sequelize;
  }
}];