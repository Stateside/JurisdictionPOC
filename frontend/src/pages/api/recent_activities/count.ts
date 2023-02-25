import { db } from '../../../db/db'
import { RecentActivities } from "../../../db/entities/RecentActivities";
import { NextApiRequest, NextApiResponse } from "next";
import { ActivitiesItem } from 'db/interfaces/IRecentActivities';

/** Gets a page of the Recent Activities from the database */
const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const activitiesRepo = (await db()).getRepository<RecentActivities>(RecentActivities.name)

  let chainId = 0
  let frontend = ""
  let ownerView = true
  if (req.query.chainId)
    chainId = parseInt(req.query.chainId as string)
  if (req.query.frontend)
    frontend = req.query.frontend as string
  if (req.query.ownerView)
    ownerView = (req.query.ownerView as string).toLowerCase() === "true"

  let count = 0
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

    count = await q.getCount()

  } catch (err) {
    console.error("Error getting activities", err)
  }

  res.send({ count });
}

export default get