import { db } from '../../../db/db'
import { DeployedContract } from "../../../db/entities/DeployedContract";
import { NextApiRequest, NextApiResponse } from "next";

/** Adds all given contracts to the given jurisdiciton in the database */
const addToJurisdiction = async (req: NextApiRequest, res: NextApiResponse) => {
  const { jurisdiction } = req.body;
  const contracts = JSON.parse(req.body.contracts)

  const contractsRepo = (await db()).getRepository(DeployedContract)
  try {
    await contractsRepo.createQueryBuilder()
      .update(DeployedContract)
      .where("address in (:addresses)", { addresses: contracts })
      .set({ jurisdiction })
      .execute();
  } catch (err) {
    console.error("Error removing jurisdiction", err)
  }
  
  res.send({});
}

export default addToJurisdiction