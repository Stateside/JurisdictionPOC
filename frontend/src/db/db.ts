import 'reflect-metadata'
import { DataSource, DataSourceOptions } from "typeorm"
import { DeployedContract } from './entities/DeployedContract';
import * as dotenv from 'dotenv'
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

const connection = datasource.initialize()
export const db = async ():Promise<DataSource> => {
  return await connection
}


