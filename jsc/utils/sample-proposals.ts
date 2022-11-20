import * as tc from "../typechain-types"
// @ts-ignore
import { ethers } from "hardhat"
import { LEGISLATIVE_ROLE } from "../utils/roles"
import { createProposalVersion, prepareProposal } from "./proposals";
import { accountsByName } from "../utils/accounts"

/*
    These are some sample proposals used to prepopulate the JSCGovernor contract during development.
 */

let proposalVersion = createProposalVersion(new Date())
const { Jane, Mary, Rich, Peter } = accountsByName

export const createSampleProposals = async (jscGovernor:tc.IJSCGovernor, jscCabinet:tc.IJSCCabinet, jscTitleToken:tc.IJSCTitleToken) => 
    [
        await prepareProposal(jscGovernor, 
            [
            {
                target: jscCabinet.address,
                name: "AddMemberRole",
                pdata: ethers.utils.defaultAbiCoder.encode(["address", "uint"],[Mary.address, LEGISLATIVE_ROLE.id])
            }
            ],
            "Add cabinet member Mary with LEGISLATIVE role",
            ++proposalVersion
        ),
        await prepareProposal(jscGovernor, 
            [
            {
                target: jscCabinet.address,
                name: "RemoveMemberRole",
                pdata: ethers.utils.defaultAbiCoder.encode(["address", "uint"],[Jane.address, LEGISLATIVE_ROLE.id])
            }
            ],
            "Remove cabinet member Jane with LEGISLATIVE role",
            ++proposalVersion
        ),
        await prepareProposal(jscGovernor, 
            [
            {
                target: jscTitleToken.address,
                name: "FreezeOwner",
                pdata: ethers.utils.defaultAbiCoder.encode(["address", "bool"],[Rich.address, true])
            }
            ], 
            "Prevent owner Rich from transfering their tokens",
            ++proposalVersion
        ),
        await prepareProposal(jscGovernor, 
            [
            {
                target: jscTitleToken.address,
                name: "FreezeOwner",
                pdata: ethers.utils.defaultAbiCoder.encode(["address", "bool"],[Peter.address, false])
            }
            ], 
            "Unfreeze the acount of owner Peter",
            ++proposalVersion
        ),
    ]

