import { db } from '../../../db/db'
import { Like } from "../../../db/entities/Like";
import { NextApiRequest, NextApiResponse } from "next";

/** Saves a new like to the database */
const save = async (req: NextApiRequest, res: NextApiResponse) => {
  const likesRepo = (await db()).getRepository(Like)
  try {
    await likesRepo.delete(req.query.id)
  } catch (err) {
    console.error("Error removing like", err)
  }
  
  res.send({});
}

export default save