import * as tc from "../typechain-types"
import { buildRoles } from "../utils/roles"
import { prepareProposal } from "./proposals";
import accounts, { accountsByName } from "../utils/accounts"
import { ParamType, VoteType } from "./types";
import { WhoHasVotedMap } from "./proposals";

/*
    These are some sample proposals used to prepopulate the JSCGovernor contract during development.
 */

const { Jane, Mary, Rich, Peter, Sara } = accountsByName

let seed = 42023
/** 
 * a javascript linear congruential generator (LCG) to generate a pseudo random number
 * https://en.wikipedia.org/wiki/Linear_congruential_generator
 */
const lcg = () => {
  const A: number = 1664543;    // multiplier
  const C: number = 1013904223; // incrementer
  const M: number = 2**31-1;    // modulus
  seed = (A * seed + C) % M
  return seed
}

// Pesudo random vote based on lcg() algorithm above
const getVotes = () => {
  const voters = accounts.map(a => a.address) 
  const m = 3 * 2 // 50% of voters will vote on average
  const votes:WhoHasVotedMap = {}
  for (let i = 0; i < voters.length; i++) {
    const v =  lcg() % m
    if (v < 3)
      votes[voters[i]] = v as VoteType
  }
    
  return votes;
}

export const createSampleProposals = async (ethers: any, jscGovernor: tc.IJSCGovernor, jscCabinet: tc.IJSCCabinet, jscTitleToken: tc.IJSCTitleToken) => {
  let proposalVersion = 1
  const roles = buildRoles(ethers)
  const result = [
    await prepareProposal(ethers, jscGovernor,
      [
        {
          target: jscCabinet.address,
          name: "AddMemberRole",
          pdata: "",
          description: "Add a new member {account} with {role} role",
          parameters: [
            {
              name: "account",
              type: ParamType.t_address,
              hint: "Address of member's account",
              value: Mary.address
            },
            {
              name: "role",
              type: ParamType.t_number,
              hint: "New role for this member",
              value: roles.LEGISLATIVE_ROLE.id
            }
          ]
        }
      ],
      "Add cabinet member Mary with Legislative role",
      proposalVersion,
      getVotes(),
    ),
    await prepareProposal(ethers, jscGovernor,
      [
        {
          target: jscCabinet.address,
          name: "RemoveMemberRole",
          pdata: "",
          description: "Remove the {role} role from member {account}",
          parameters: [
            {
              name: "account",
              type: ParamType.t_address,
              hint: "Address of member's account",
              value: Jane.address
            },
            {
              name: "role",
              type: ParamType.t_number,
              hint: "Revoked role for this member",
              value: roles.LEGISLATIVE_ROLE.id
            }
          ]
        }
      ],
      "Remove cabinet member Jane with Legislative role",
      ++proposalVersion,
      getVotes(),
    ),
    await prepareProposal(ethers, jscGovernor,
      [
        {
          target: jscTitleToken.address,
          name: "FreezeOwner",
          pdata: "",
          description: "Set frozen state of owner {owner} to {freeze}",
          parameters: [
            {
              name: "owner",
              type: ParamType.t_address,
              hint: "Address of selected owner",
              value: Rich.address
            },
            {
              name: "freeze",
              type: ParamType.t_bool,
              hint: "Freeze owner?",
              value: true
            }
          ]
        }
      ],
      "Prevent owner Rich from transfering their tokens",
      ++proposalVersion,
      getVotes(),
    ),
    await prepareProposal(ethers, jscGovernor,
      [
        {
          target: jscTitleToken.address,
          name: "FreezeOwner",
          pdata: "",
          description: "Set frozen state of owner {owner} to {freeze}",
          parameters: [
            {
              name: "owner",
              type: ParamType.t_address,
              hint: "Address of selected owner",
              value: Peter.address
            },
            {
              name: "freeze",
              type: ParamType.t_bool,
              hint: "Freeze owner?",
              value: false
            }
          ]
        }
      ],
      "Unfreeze the account of owner Peter",
      ++proposalVersion,
      getVotes(),
    ),
  ]

  return result
}