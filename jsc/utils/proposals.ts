import * as tc from "../typechain-types"
import { BigNumber } from "ethers";
import { ParamType, ParamType2SolidyType, VoteType } from "./types";

/*
   These are some utilities to make working with proposals easier in unit tests and development. Since
   the contract does not record the description or other details of the proposal, it is necessary
   to keep track of it ourselves.
 */

/** 
   A convention for proposal versions is to use a number which represents the 
   date of the form YYYYMMDDnn: for example 2022123100. 
 */
export const createProposalVersion = (d: Date) => {
    let v = d.getFullYear()
    v = v*100 + d.getMonth() + 1
    v = v*100 + d.getDate()
    return v*100;
}

export type IPreparedParameter = {
    name: string,
    type: ParamType,
    hint: string,
    value: any,
}

export type PreparedRevision = {
    target: string
    name: string
    description: string
    pdata: string
    parameters: IPreparedParameter[]
}

export type WhoHasVotedMap = { [account: string]: VoteType }

export type PreparedProposal = {
    revs: PreparedRevision[],
    description: string,
    descriptionHash: string,
    proposalHash: BigNumber,
    version: number,
    whoHasVoted: WhoHasVotedMap,
    incrementVersion: () => void
}

/** Calculates the description and proposal hashes */
export const prepareProposal = async (ethers:any, governor:tc.IJSCGovernor, revs: PreparedRevision[], description: string, version:number, whoHasVoted: WhoHasVotedMap):Promise<PreparedProposal> => {
    const descriptionHash:string = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(description))
    revs.forEach(r => {
        r.pdata = ethers.utils.defaultAbiCoder.encode(
            r.parameters.map(p => ParamType2SolidyType[p.type]),
            r.parameters.map(p => p.value)
        )
    })
    const pp:PreparedProposal = {
        revs,
        description,
        descriptionHash,
        proposalHash: BigNumber.from(0),
        version:-1,
        whoHasVoted,
        incrementVersion: async function() {
            this.version = this.version === -1 ? version : this.version+1
            this.proposalHash = await governor.hashProposal(revs, descriptionHash, this.version)
        }
    }
    await pp.incrementVersion();
    return pp
}
