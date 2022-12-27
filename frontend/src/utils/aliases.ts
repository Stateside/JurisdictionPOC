import { ethers } from "ethers";
import accounts from "./accounts";

/*
    This module gets collections of alias information from the database of account aliases and the built-in account numbers and their names
 */
export type AliasInfo = { 
    alias: string
    address: string
}

export type AliasData = {
    aliases: AliasInfo[]
    aliasesByName: Map<string, string>
    aliasesByAddress: Map<string, string>
}

export const aliases: AliasInfo[] = []
export const aliasesByName = new Map<string, string>()
export const aliasesByAddress = new Map<string, string>()

export const reloadAliases = async ():Promise<AliasData> => {
    const aliases: AliasInfo[] = []
    const aliasesByName = new Map<string, string>()
    const aliasesByAddress = new Map<string, string>()

    const response = await fetch('/api/aliases/get');
    const json = await response.json()
    json.forEach((a: AliasInfo) => {
        aliases.push({ alias: a.alias, address: a.address })
        aliasesByAddress.set(a.address.toLowerCase(), a.alias)
        aliasesByName.set(a.alias.toLowerCase(), a.address)
    })

    accounts.forEach(a => {
        if (!aliasesByAddress.has(a.address)) {
            aliases.push({ alias: a.name, address: a.address })
            aliasesByAddress.set(a.address.toLowerCase(), a.name)
            aliasesByName.set(a.name.toLowerCase(), a.address)
        }
    })

    return {
        aliases,
        aliasesByName,
        aliasesByAddress
    }
}
