import 'reflect-metadata'
import { DataSource } from "typeorm"
import { DeployedContract } from './entities/DeployedContract';
import * as dotenv from 'dotenv'
import { Alias } from './entities/Alias';

// Load environment variables using dotenv if we are running outside nextjs (i.e. for the typeorm CLI or for migrations)
if (process.env.NODE_ENV === undefined) {	
  dotenv.config({ path: '.env.development.local' })
}

const host = process.env.DB_HOST || 'localhost';
const port = parseInt(process.env.DB_PORT || "3306");
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const database = process.env.DB_DATABASE

export const datasource:DataSource = new DataSource({
  type: "mysql",
  host: host,
  port: port,
  username: username,
  password: password,
  database: database,
  entities: [Alias, DeployedContract],
  migrations: [__dirname + '/Migrations/**/*.ts'],
  synchronize: true,
  logging: false
})

console.log(`Connecting to database ${database} on ${host}:${port}`)

export const db = async ():Promise<DataSource> => {
  if (!datasource.isInitialized)
    await datasource.initialize()
      .then(() => {
        console.log(`Connected`)
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err)
      })
  return datasource
}
