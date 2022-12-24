export default config = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": process.env.DB_DIALECT,
    "migrationStorage": "json",
    "migrationStoragePath": "db/migrations/sequelize-meta.json",
    "seederStorage": "json",
    "seederStoragePath": "db/seeders/sequelizeData.json"
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": process.env.DB_DIALECT,
    "migrationStorage": "json",
    "migrationStoragePath": "db/migrations/sequelize-meta.json",
    "seederStorage": "json",
    "seederStoragePath": "db/seeders/sequelizeData.json"
  }
}