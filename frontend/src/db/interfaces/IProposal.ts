import { IRevision } from "./IRevision"

export { ParamType } from "../../utils/types"

export interface IProposal {
  id: string
  startBlock: number
  deadline: number
  proposer: string
  version: number
  description: string
  chainId: number
  governor: string
  revisions: IRevision[]
  createdAt: Date
  updatedAt: Date
}