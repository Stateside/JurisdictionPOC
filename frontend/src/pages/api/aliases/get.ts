import { db } from '../../../db/db'
import { Alias } from "../../../db/entities/Alias";
import { NextApiRequest, NextApiResponse } from "next";

/** Gets all known account address aliases from the database */
const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const aliasesRepo = (await db()).getRepository(Alias)
  let aliases:Alias[] = []

  try {
    aliases = await aliasesRepo.find()
  } catch (err) {
    console.error("Error getting aliases", err)
  }

  res.send(aliases);
}

export default get