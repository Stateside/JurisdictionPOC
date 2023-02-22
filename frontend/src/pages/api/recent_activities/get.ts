import { db } from '../../../db/db'
import { RecentActivities } from "../../../db/entities/RecentActivities";
import { NextApiRequest, NextApiResponse } from "next";

/** Gets all the given Recent Activities from the database */
const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const activitiesRepo = (await db()).getRepository<RecentActivities>(RecentActivities.name)
  let activities:RecentActivities[] = []

  let filter:any = {}
  if (req.query.owner)
    filter.owner = req.query.owner as string
  if (req.query.chainId)
    filter.chainId = req.query.chainId as string
  if (req.query.frontend)
    filter.frontend = req.query.frontend as string

  try {
    activities = await activitiesRepo.find(filter)
  } catch (err) {
    console.error("Error getting activities", err)
  }

  res.send(activities);
}

export default get