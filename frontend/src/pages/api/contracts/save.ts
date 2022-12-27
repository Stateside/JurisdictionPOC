import { db } from '../../../db/db'
import { DeployedContract } from "../../../db/entities/DeployedContract";
import { NextApiRequest, NextApiResponse } from "next";

/** Saves a new jurisdiction to the database */
const save = async (req: NextApiRequest, res: NextApiResponse) => {
  const item = req.body;
  const newItem = new DeployedContract({
    name: item.name,
    version: item.version,
    interface: item.interface,
    address: item.address,
    description: item.description,
    chainId: item.chainId
  })

  const contractsRepo = (await db()).getRepository(DeployedContract)
  try {
    await contractsRepo.save(newItem)
  } catch (err) {
    console.error("Error saving jurisdiction", err)
  }
  
  res.send(newItem);
}

export default save