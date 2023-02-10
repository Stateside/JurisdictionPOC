import { db } from '../../../db/db'
import { Like } from "../../../db/entities/Like";
import { NextApiRequest, NextApiResponse } from "next";

/** Gets all the given owner's likes from the database */
const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const likesRepo = (await db()).getRepository<Like>(Like.name)
  let likes:Like[] = []

  let filter:any = {}
  if (req.query.owner)
    filter.owner = req.query.owner as string
  if (req.query.chainId)
    filter.chainId = req.query.chainId as string
  if (req.query.frontend)
    filter.frontend = req.query.frontend as string

  try {
    likes = await likesRepo.findBy(filter)
  } catch (err) {
    console.error("Error getting likes", err)
  }

  res.send(likes);
}

export default get