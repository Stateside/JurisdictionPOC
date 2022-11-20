// @ts-ignore
import { ethers } from "hardhat" 

/*
    These are some utlities for working with the defult roles used by the JSCCabinet contract.

    Roles have names but they are identified by their hash value (a 32-byte integer) rather than strings.
 */

export type Role = {
    name: string
    id: string
}

export const roleNames = ["JUDICIAL_ROLE", "LEGISLATIVE_ROLE", "EXECUTIVE_ROLE"]
export const rolesByName:{[name: string]: Role} = {}
export const rolesById:{[id: string]: Role} = {}

for (let rn = 0; rn < roleNames.length; rn++) {
  const roleName:string = roleNames[rn]
  const role:Role = {
    name: roleName,
    id: ethers.utils.keccak256(ethers.utils.toUtf8Bytes(roleName))
  }
  rolesByName[role.name] = role
  rolesById[role.id] = role
}

export const {
    JUDICIAL_ROLE,
    LEGISLATIVE_ROLE,
    EXECUTIVE_ROLE 
} = rolesByName
