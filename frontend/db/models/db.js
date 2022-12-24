 import { Sequelize } from 'sequelize';

const dialect = process.env.DB_DIALECT || 'mysql';
const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 3306;
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const database = process.env.DB_DATABASE
const url = `${dialect}://${username}:${password}@${host}:${port}/${database}`
console.log(url)
const sequelize = new Sequelize(url)

sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

export default sequelize;