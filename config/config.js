require("dotenv").config();

module.exports = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT,
  migrationStorage: "sequelize",
  migrationStorageTableName: "sequelize_meta_migration",
  seederStorage: "sequelize",
  seederStorageTableName: "sequelize_data_seeder",
  dialectOptions: {
    bigNumberStrings: true
  }
};