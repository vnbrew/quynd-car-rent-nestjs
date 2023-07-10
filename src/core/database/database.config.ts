import { IDatabaseConfig } from "./database.interfaces";
import { config } from "dotenv";

config();

export const databaseConfig: IDatabaseConfig = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_DEVELOPMENT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    define: {
      timestamps: false
    }
  },
  staging: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_STAGING,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    define: {
      timestamps: false
    }
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_PRODUCTION,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    define: {
      timestamps: false
    }
  }
};