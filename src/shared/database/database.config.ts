import { IDatabaseConfig } from "./database.interfaces";
import { config } from "dotenv";

config();

export const databaseConfig: IDatabaseConfig = {
  config: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    define: {
      timestamps: false,
    },
    logging: process.env.NODE_ENV !== "production"
  },
};