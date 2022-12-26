import 'reflect-metadata'
import { DataSource } from "typeorm"
import { DeployedContract } from './entities/DeployedContract';

const host = process.env.DB_HOST || 'localhost';
const port = parseInt(process.env.DB_PORT || "3306");
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const database = process.env.DB_DATABASE

let datasource:DataSource|undefined

const init = async ():Promise<DataSource> => {
  if (!datasource) {
    datasource = new DataSource({
      type: "mysql",
      host: host,
      port: port,
      username: username,
      password: password,
      database: database,
      entities: [DeployedContract],
      synchronize: true,
      logging: true,
    })

    await datasource.initialize()
      .then(() => {
        console.log(`Connected to database ${database} on ${host}:${port}`)
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err)
      })
  }
  return datasource
}

export default init;