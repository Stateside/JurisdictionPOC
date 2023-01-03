import create from 'zustand'

export type IAlias = {
  address: string
  alias: string
}

export type AliasMap = { [key: string]: IAlias };

/*
 * Zustand state for aliases, which are human readable representatios of 42 character addresses
 *
 * Zustand is a React state management library that is similar to Redux but much simpler.
 * Zustand state is created with a function that returns an object with the state properties and functions to modify the state.
 * Zustand state is accessed with the useAliases() hook. But it must be initialized with the init() function before it can be used.
 * (In our case in the Layout component.)
 * 
 * Aliases are added with the addAlias() and addAliases() functions
 */
interface IAliasesState {
  aliases:IAlias[],
  aliasesByAddress:AliasMap,
  aliasesByName:AliasMap,
  loaded:boolean

  /** Loads existing aliases from the database. Must be called at least once when React app loads */
  init: () => void,

  /** Adds a new alias to the set of aliases */
  addAlias: (alias:IAlias) => void,

  /** Adds or updates a collection of Aliases */
  addAliases: (aliases:IAlias[]) => void,
}

const saveAliasesToDatabase = async (aliases:IAlias[]) => {
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(aliases)
  }
  await fetch("/api/aliases/save", request)
    .then((r) => {
      if (r.status === 200)
        console.log("Saved aliases")
      else
        console.log("Error saving aliases")
      return r.json()
    },
    (e) => {
      console.log("Error saving aliases", e)
    })
}  

/** Create Zustand state with collection of all likes for current user */
export const useAliases = create<IAliasesState>((set, get) => ({
  aliases: [] as IAlias[],
  aliasesByAddress: {} as AliasMap,
  aliasesByName: {} as AliasMap,
  loaded: false,

  init: async () => {
    if (get().loaded)
      return

    const res = await fetch('/api/aliases/get')
    const aliases:IAlias[] = await res.json()
    aliases.sort((a,b) => a.alias.localeCompare(b.alias))

    const aliasesByAddress:AliasMap = {}
    const aliasesByName:AliasMap = {}
    aliases.forEach(a => {
      aliasesByAddress[a.address.toLowerCase()] = a
      aliasesByName[a.alias] = a
    })
    set({
      aliases,
      aliasesByAddress, 
      aliasesByName,
      loaded:true
    })
  },

  addAlias: async (alias:IAlias) => {
    await get().addAliases([alias])
  },

  addAliases: async (newAliases:IAlias[]) => {
    await saveAliasesToDatabase(newAliases)

    const aliasesByAddress = {...get().aliasesByAddress}
    const aliasesByName = {...get().aliasesByName}
    newAliases.forEach(alias => {
      aliasesByAddress[alias.address.toLowerCase()] = alias
      aliasesByName[alias.alias] = alias
    })

    const aliases = Object.values(aliasesByAddress)
    aliases.sort((a,b) => a.alias.localeCompare(b.alias))

    set({aliases, aliasesByAddress, aliasesByName})
  },
}))
