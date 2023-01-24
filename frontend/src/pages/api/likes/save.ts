import { db } from '../../../db/db'
import { Like } from "../../../db/entities/Like";
import { NextApiRequest, NextApiResponse } from "next";

/** Saves a new like to the database */
const save = async (req: NextApiRequest, res: NextApiResponse) => {
  const likeData = req.body;
  const newLike = new Like({
    name: likeData.name,
    itemType: likeData.itemType,
    itemId: likeData.itemId,
    jurisdiction: likeData.jurisdiction,
    owner: likeData.owner,
    frontend: likeData.frontend,
    chainId: likeData.chainId
  })

  const likesRepo = (await db()).getRepository<Like>(Like.name)
  try {
    await likesRepo.createQueryBuilder()
      .insert()
      .into<Like>(Like.name)
      .values([newLike])
      .execute();
  } catch (err) {
    console.error("Error saving like", err)
  }
  
  res.send(newLike);
}

export default save