import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

const FOLDER = "../jsc/deployments/localhost/"

type ContractInfo = {
  name:string
  address:string
  description:string
}

/** Loads the contracts that have been deployed by Hardhat on the "localhost" blockchain */
const getContracts = async (req: NextApiRequest, res: NextApiResponse) => {
  const hhDeployedContracts = fs.readdirSync(FOLDER);
  const contracts:ContractInfo[] = hhDeployedContracts
    .filter(f => f.startsWith("development"))
    .map(f => {
      const json = JSON.parse(fs.readFileSync(FOLDER + f, "utf8"))
      return {
        name: f,
        address: json.address,
        description: json.devdoc.details
      }
    })

  res.send(contracts);
}

export default getContracts