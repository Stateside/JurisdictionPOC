import { db } from '../../../db/db'
import { DeployedContract } from "../../../db/entities/DeployedContract";
import { NextApiRequest, NextApiResponse } from "next";

/** Removes a jurisdiction and all related contracts and favourites from the database */
const removeJurisdiction = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.body;
  const contractsRepo = (await db()).getRepository<DeployedContract>(DeployedContract.name)
  try {
    await contractsRepo.createQueryBuilder()
      .delete()
      .from<DeployedContract>(DeployedContract.name)
      .where("jurisdiction = :address", { address })
      .execute();
  } catch (err) {
    console.error("Error removing jurisdiction", err)
  }
  
  res.send({});
}

export default removeJurisdiction