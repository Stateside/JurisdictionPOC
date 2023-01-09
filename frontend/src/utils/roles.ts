/*
    These are some utlities for working with the defult roles used by the JSCCabinet contract.

    Roles have names but they are identified by their hash value (a 32-byte integer) rather than strings.
 */

export type Role = {
    friendlyName: string
    name: string
    id: string
}

export type RolesInfo = {
    rolesArray: Role[]
    rolesByName: {[name: string]: Role}
    rolesByFriendlyName: {[name: string]: Role}
    rolesById: {[id: string]: Role}
    JUDICIAL_ROLE: Role
    LEGISLATIVE_ROLE: Role
    EXECUTIVE_ROLE: Role
}
let rolesInfo: RolesInfo = {} as RolesInfo

export const buildRoles = (ethers:any):RolesInfo => {
    if (rolesInfo.rolesArray) 
        return rolesInfo

    const roleNames = ["JUDICIAL_ROLE", "LEGISLATIVE_ROLE", "EXECUTIVE_ROLE"]
    const rolesByName:{[name: string]: Role} = {}
    const rolesByFriendlyName:{[name: string]: Role} = {}
    const rolesById:{[id: string]: Role} = {}
    const rolesArray:Role[] = []

    for (let rn = 0; rn < roleNames.length; rn++) {
        const roleName:string = roleNames[rn]
        const friendlyName:string = roleName[0] + roleName.slice(1, roleName.length-"_ROLE".length).toLowerCase()

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

    rolesInfo = {
        rolesArray,
        rolesByName,
        rolesByFriendlyName,
        rolesById,
        JUDICIAL_ROLE: rolesByName.JUDICIAL_ROLE,
        LEGISLATIVE_ROLE: rolesByName.LEGISLATIVE_ROLE,
        EXECUTIVE_ROLE: rolesByName.EXECUTIVE_ROLE
    }

    return rolesInfo
}
