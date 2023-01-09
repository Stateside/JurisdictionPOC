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
  logging: false,
  extra: {
    connectionLimit: 50
  },
  maxQueryExecutionTime: 2000
}

export const datasource:DataSource = new DataSource(dbconfig)

export const db = async ():Promise<DataSource> => {
  if (!datasource.isInitialized)
    await datasource.initialize()
      .then(() => {
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err)
      })
  return datasource
}

export const withDB = async (handler:any) => {
  console.log(`Connecting to database ${database} on ${host}:${port}`)
  const ds:DataSource = new DataSource(dbconfig)
  await ds.initialize()
  try {
    await handler(ds)
  }
  finally {
    console.log(`Closing database ${database} on ${host}:${port}`)
    ds.destroy()
  }
}

export { DataSource as Database } from "typeorm"

