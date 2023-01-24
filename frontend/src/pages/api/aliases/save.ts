import { db } from '../../../db/db'
import { Alias } from "../../../db/entities/Alias";
import { NextApiRequest, NextApiResponse } from "next";

/** Saves new aliases to the database */
const save = async (req: NextApiRequest, res: NextApiResponse) => {
  const items = req.body.aliases;
  const newItems = items.map((i:any) => new Alias({
    alias: i.alias,
    address: i.address
  }))

  const aliasesRepo = (await db()).getRepository<Alias>(Alias.name)
  try {
    await aliasesRepo.createQueryBuilder()
      .insert()
      .into<Alias>(Alias.name)
      .values(newItems)
      .orUpdate(["alias"]) // Overwrite alias if the address already exists
      .execute();
  } catch (err) {
    console.error("Error saving alias", err)
  }
  
  res.send(newItems);
}

export default save