import { db } from '../../../db/db'
import { RecentActivities } from "../../../db/entities/RecentActivities";
import { NextApiRequest, NextApiResponse } from "next";

/** Saves a new activity to the database */
const save = async (req: NextApiRequest, res: NextApiResponse) => {
  const activityData = req.body;
  const newActivity = new RecentActivities({
    url: activityData.url,
    text: activityData.text,
    itemType: activityData.itemType,
    account: activityData.account,
    frontend: activityData.frontend,
    chainId: activityData.chainId
  })

  const activitiesRepo = (await db()).getRepository<RecentActivities>(RecentActivities.name)
  try {
    await activitiesRepo.createQueryBuilder()
      .insert()
      .into<RecentActivities>(RecentActivities.name)
      .values([newActivity])
      .execute();
  } catch (err) {
    console.error("Error saving activity", err)
  }
  
  res.send(newActivity);
}

export default save