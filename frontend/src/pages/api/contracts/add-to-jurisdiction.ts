import { db } from '../../../db/db'
import { DeployedContract } from "../../../db/entities/DeployedContract";
import { NextApiRequest, NextApiResponse } from "next";

/** Adds all given contracts to the given jurisdiction in the database */
const addToJurisdiction = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { jurisdiction, contracts } = req.body;
    const contractsRepo = (await db()).getRepository(DeployedContract)
    await contractsRepo.createQueryBuilder()
      .update(DeployedContract)
      .where("address in (:addresses)", { addresses: contracts })
      .set({ jurisdiction })
      .execute();
  } catch (err) {
    console.error("Error adding contracts to jurisdiction", err)
  }
  
  res.send({});
}

export default addToJurisdiction