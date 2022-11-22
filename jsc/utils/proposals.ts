import * as tc from "../typechain-types"
// @ts-ignore
import { ethers } from "hardhat"
import { BigNumber } from "ethers";

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

export type PreparedProposal = {
    revs: tc.IJSCGovernor.RevisionCallStruct[],
    description: string,
    descriptionHash: string,
    proposalHash: BigNumber,
    version: number,
    incrementVersion: () => void
}

/** Calculates the description and proposal hashes */
export const prepareProposal = async (governor:tc.IJSCGovernor, revs: tc.IJSCGovernor.RevisionCallStruct[], description: string, version:number):Promise<PreparedProposal> => {
    const descriptionHash:string = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(description))
    const pp:PreparedProposal = {
        revs,
        description,
        descriptionHash,
        proposalHash: BigNumber.from(0),
        version:-1,
        incrementVersion: async function() {
            this.version = this.version === -1 ? version : this.version+1
            this.proposalHash = await governor.hashProposal(revs, descriptionHash, this.version)
        }
    }
    await pp.incrementVersion();
    return pp
}
