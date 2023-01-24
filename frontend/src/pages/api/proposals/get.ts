import { db } from '../../../db/db'
import { Proposal } from "../../../db/entities/Proposal";
import { NextApiRequest, NextApiResponse } from "next";

/** Loads all proposal details for the given contract or chainId from the database */
const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const proposalRepo = (await db()).getRepository<Proposal>(Proposal.name)
  let proposals:Proposal[] = []

  let filter:any = {}
  if (req.query.governor)
    filter.governor = req.query.governor as string
  if (req.query.chainId)
    filter.chainId = req.query.chainId as string
  if (req.query.id)
    filter.id = req.query.id as string

  try {
    proposals = await proposalRepo.findBy(filter)
  } catch (err) {
    console.error("Error getting proposals", err)
  }

  res.send(proposals);
}

export default get