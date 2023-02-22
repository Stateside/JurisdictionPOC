import { db } from '../../../db/db'
import { RecentActivities } from "../../../db/entities/RecentActivities";
import { NextApiRequest, NextApiResponse } from "next";

/** Saves a new activity to the database */
const save = async (req: NextApiRequest, res: NextApiResponse) => {
  const newActivities:RecentActivities[] = []
  const activityData = req.body;
  if (Array.isArray(activityData)) {
    activityData.forEach((activity) => {
      newActivities.push(new RecentActivities({
        url: activity.url,
        text: activity.text,
        itemType: activity.itemType,
        account: activity.account,
        frontend: activity.frontend,
        chainId: activity.chainId
      }))
    })
  }
  else {
    newActivities.push(new RecentActivities({
      url: activityData.url,
      text: activityData.text,
      itemType: activityData.itemType,
      account: activityData.account,
      frontend: activityData.frontend,
      chainId: activityData.chainId
    }))
  }

  const activitiesRepo = (await db()).getRepository<RecentActivities>(RecentActivities.name)
  try {
    await activitiesRepo.createQueryBuilder()
      .insert()
      .into<RecentActivities>(RecentActivities.name)
      .values(newActivities)
      .execute();
  } catch (err) {
    console.error("Error saving activity", err)
  }
  
  res.send(newActivities);
}

export default save