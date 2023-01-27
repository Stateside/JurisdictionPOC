import { db } from '../../../db/db'
import { Proposal } from "../../../db/entities/Proposal";
import { NextApiRequest, NextApiResponse } from "next";
import { IProposal, ParamType } from '../../../db/interfaces/IProposal';

/** Saves a new proposal to the database */
const save = async (req: NextApiRequest, res: NextApiResponse) => {
  let savedProposal:Proposal|undefined = undefined
  try {
    const proposalRepo = (await db()).getRepository<Proposal>(Proposal.name)
    const proposals = req.body.map((p:IProposal) => ({
      id: p.id,
      startBlock: p.startBlock,
      deadline: p.deadline,
      proposer: p.proposer,
      version: p.version,
      description: p.description,
      chainId: p.chainId,
      governor: p.governor,
      revisions: p.revisions.map((r:any) => ({
        target: r.target,
        name: r.name,
        description: r.description,
        pdata: r.pdata,
        parameters: r.parameters.map((p:any) => ({
          name: p.name,
          type: p.type,
          hint: p.hint,
          value: p.value
        }))
      })),
    }));

    savedProposal = await proposalRepo.save(proposals)
  } catch (err) {
    console.error("Error saving proposal", err)
  }
  
  res.send(savedProposal);
}

export default save