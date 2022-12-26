import db from '../../../db/db'
import { DeployedContract } from "../../../db/entities/DeployedContract";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

/* Loads the contracts that are in the database and merges them with those have been deployed by Hardhat on the "localhost" blockchain */

const FOLDER = "../jsc/deployments/localhost/"
const mergeArtifacts = async (jurisdictions:DeployedContract[]) => {
  const merged:DeployedContract[] = [...jurisdictions]
  const chainId = parseInt(fs.readFileSync(FOLDER + ".chainId", "utf8"))

  const hhDeployedContracts = fs.readdirSync(FOLDER);
  hhDeployedContracts
    .filter(f => f === "development_JSCJurisdiction.json")
    .map(f => {
      const json = JSON.parse(fs.readFileSync(FOLDER + f, "utf8"))
      return new DeployedContract({
        name: "JSCJurisdiction",
        address: json.address,
        chainId,
        description: json.devdoc.details,
        interface: "IJSCJurisdiction",
        version: "0.1"
      })
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
  const contractsRepo = (await db()).getRepository(DeployedContract)
  let jurisdictions:DeployedContract[] = []
  try {
    jurisdictions = (await contractsRepo.findBy({
      interface: "IJSCJurisdiction"
    }))
  } catch (err) {
    console.error("Error getting jurisdictions", err)
  }

  res.send(await mergeArtifacts(jurisdictions));
}

export default get