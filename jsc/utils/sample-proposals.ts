import * as tc from "../typechain-types"
import { buildRoles } from "../utils/roles"
import { prepareProposal } from "./proposals";
import { accountsByName } from "../utils/accounts"
import { ParamType } from "./types";

/*
    These are some sample proposals used to prepopulate the JSCGovernor contract during development.
 */

const { Jane, Mary, Rich, Peter } = accountsByName

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
      proposalVersion
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
      ++proposalVersion
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
      ++proposalVersion
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
      ++proposalVersion
    ),
  ]

  return result
}