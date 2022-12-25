import { NextApiRequest, NextApiResponse } from "next";
import { DeployedContract } from "../../../../db/models/contracts";

/** Saves a new jurisdiction to the database */
const save = async (req: NextApiRequest, res: NextApiResponse) => {
  const item = req.body;
  const newItem = await DeployedContract.create({
    name: item.name,
    version: item.version,
    interface: item.interface,
    address: item.address,
    description: item.description,
    chainId: item.chainId
  })

  res.send(newItem);
}

export default save