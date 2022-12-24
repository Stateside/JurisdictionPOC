import { NextApiRequest, NextApiResponse } from "next";
import { DeployedContract } from "../../../../db/models/contracts";
import fs from "fs";

/* Loads the contracts that are in the database and merges them with those have been deployed by Hardhat on the "localhost" blockchain */

export type ContractInfo = {
  name: string
  address: string
  chainId: string
  description: string
  interface: string
  version: string
}

const FOLDER = "../jsc/deployments/localhost/"
const mergeArtifacts = async (jurisdictions:ContractInfo[]) => {
  const merged:ContractInfo[] = [...jurisdictions]
  const chainId = fs.readFileSync(FOLDER + ".chainId", "utf8")

  const hhDeployedContracts = fs.readdirSync(FOLDER);
  hhDeployedContracts
    .filter(f => f === "development_JSCJurisdiction.json")
    .map(f => {
      const json = JSON.parse(fs.readFileSync(FOLDER + f, "utf8"))
      return {
        name: "JSCJurisdiction",
        address: json.address,
        chainId,
        description: json.devdoc.details,
        interface: "IJSCJurisdiction",
        version: "0.1"
      }
    })
    .forEach(c => {
      const index = merged.findIndex(m => m.address === c.address)
      if (index < 0)
        merged.push(c)
    })
  return merged;
}

/** Saves a new jurisdiction to the database */
const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const jurisdictions:ContractInfo[] = (await DeployedContract.findAll({
    where: {
      interface: "IJSCJurisdiction"
    }
  })).map(j => j.dataValues) as any
  res.send(await mergeArtifacts(jurisdictions));
}

export default get