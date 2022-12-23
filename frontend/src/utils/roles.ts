import { ethers } from "ethers";

/*
    These are some utlities for working with the defult roles used by the JSCCabinet contract.

    Roles have names but they are identified by their hash value (a 32-byte integer) rather than strings.
 */

export type Role = {
    friendlyName: string
    name: string
    id: string
}

export const roleNames = ["JUDICIAL_ROLE", "LEGISLATIVE_ROLE", "EXECUTIVE_ROLE"]
export const rolesByName:{[name: string]: Role} = {}
export const rolesByFriendlyName:{[name: string]: Role} = {}
export const rolesById:{[id: string]: Role} = {}
export const rolesArray:Role[] = []

for (let rn = 0; rn < roleNames.length; rn++) {
  const roleName:string = roleNames[rn]
  const friendlyName:string = roleName[0] + roleName.slice(1).replace("_ROLE", "").toLowerCase()

  const role:Role = {
    friendlyName, 
    name: roleName,
    id: ethers.utils.keccak256(ethers.utils.toUtf8Bytes(roleName))
  }
  rolesByName[role.name] = role
  rolesByFriendlyName[friendlyName] = role
  rolesById[role.id] = role
  rolesArray.push(role)
}

export const {
    JUDICIAL_ROLE,
    LEGISLATIVE_ROLE,
    EXECUTIVE_ROLE 
} = rolesByName
