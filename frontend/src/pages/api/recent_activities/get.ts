import { db } from '../../../db/db'
import { RecentActivities } from "../../../db/entities/RecentActivities";
import { NextApiRequest, NextApiResponse } from "next";
import { ActivitiesItem } from 'db/interfaces/IRecentActivities';

/** Gets a page of the Recent Activities from the database */
const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const activitiesRepo = (await db()).getRepository<RecentActivities>(RecentActivities.name)
  let activities:RecentActivities[] = []

  let chainId = 0
  let frontend = ""
  let offset = 0
  let limit = 0
  let ownerView = true

  if (req.query.chainId)
    chainId = parseInt(req.query.chainId as string)
  if (req.query.frontend)
    frontend = req.query.frontend as string
  if (req.query.offset)
    offset = parseInt(req.query.offset as string)
  if (req.query.limit)
    limit = parseInt(req.query.limit as string)
  if (req.query.ownerView)
    ownerView = (req.query.ownerView as string).toLowerCase() === "true"

  try {
    let q = await activitiesRepo
      .createQueryBuilder("activities")
    if (chainId)
      q = q.andWhere("chainId = :chainId", { chainId })
    if (frontend)
      q = q.andWhere("frontend = :frontend", { frontend })
    if (ownerView)
      q = q.andWhere("itemType IN (:...types)", { types: [
        ActivitiesItem.OfferToBuy,
        ActivitiesItem.OfferToSell,
        ActivitiesItem.AcceptOfferToBuy,
        ActivitiesItem.AcceptOfferToSell,
        ActivitiesItem.RetractOfferToBuy,
        ActivitiesItem.RetractOfferToSell,      
      ] })
    q = q.offset(offset||0)
    q = q.limit(limit||10)
    q = q.addOrderBy("createdAt", "DESC")
    q = q.addOrderBy("id", "DESC") // Prevent duplicates when createdAt is the same

    activities = await q.getMany()

  } catch (err) {
    console.error("Error getting activities", err)
  }

  res.send(activities);
}

export default get