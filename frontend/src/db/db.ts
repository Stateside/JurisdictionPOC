import 'reflect-metadata'
import { DataSource, DataSourceOptions } from "typeorm"
import * as dotenv from 'dotenv'
import { DeployedContract } from './entities/DeployedContract';
import { Alias } from './entities/Alias';
import { Like } from './entities/Like';
import { Proposal } from './entities/Proposal';
import { Revision } from './entities/Revision';
import { RevisionParameter } from './entities/RevisionParameter';

// Load environment variables using dotenv if we are running outside nextjs (i.e. for the typeorm CLI or for migrations)
if (process.env.NODE_ENV === undefined) {	
  dotenv.config({ path: '.env.development.local' })
}

const host = process.env.DB_HOST || 'localhost';
const port = parseInt(process.env.DB_PORT || "3306");
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const database = process.env.DB_DATABASE

const dbconfig:DataSourceOptions = {
  type: "mysql",
  host: host,
  port: port,
  username: username,
  password: password,
  database: database,
  entities: [Alias, DeployedContract, Like, Proposal, Revision, RevisionParameter],
  synchronize: true,
  logging: false
}

export const datasource:DataSource = new DataSource(dbconfig)

export const db = async ():Promise<DataSource> => {
  // Save datasource in global context so that we don't have to reconnect to the database for every request
  const globals:any = global
  if (globals.jsc === undefined)
    globals.jsc = {}

  if (globals.jsc.datasource === undefined)  {
    console.log("Connecting to database " + database)
    globals.jsc.datasource = new DataSource(dbconfig).initialize()
  }
  return await globals.jsc.datasource
}