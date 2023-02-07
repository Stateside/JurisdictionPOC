import { ParamType } from '@/utils/types';
import { Provider } from '@ethersproject/providers';
import create from 'zustand'
import { IJSCJurisdiction, IJSCJurisdiction__factory } from '../../typechain-types';

export type IContract = {
  name: string
  address: string
  description: string
}

export type IContracts = {
  list: IContract[]
  byName: { [name: string]: IContract }
}

export enum JurisdictionStatus {
  Unknown = 0,
  Exists = 1,
  NotFound = 2
}

export type  JurisdictionInfo = { 
  address: string 
  name: string
  version: string
  description: string
  status: JurisdictionStatus
  createdAt?: Date
};

export type JurisdictionInfoMap = { [address: string]: JurisdictionInfo }
export type JurisdictionContractsMap = { [address: string]: IContracts }
export type JurisdictionInstanceMap = { [address: string]: IJSCJurisdiction }

/*
 * Zustand state to load and cache jurisdiction addresses with convenience methods to access typechain instances and some details like the name and contracts 
 *
 * State must be initialized by loading all known jurisdiction addresses from the database with the init() function. This should be called once from
 * a top level component like the Layout component.
 * 
 * The state is accessed with the useJurisdictions() hook. Individual jurisdictions can be accessed get() function. 
 * 
 * New jurisdictions can be added with the add() function. For example after creating a new jurisdicion on the /juridisction/create page.
 */
export interface IJurisdictionsState {
  infos:JurisdictionInfoMap
  contracts:JurisdictionContractsMap
  instances:JurisdictionInstanceMap
  chainId:number
  loaded:boolean

  /** Starts loading all the known jurisdiction addresses and details from the database */
  init: (chainId:number) => Promise<void>,

  /** Confirms the existance of loaded jurisdictions */
  confirm: (provider:Provider) => Promise<void>,

  /** Returns the name, version, description, etc. of the given Jurisdiction.
   * If a provider is given and the requested jurisdicitn is not found in the database,
   * it will attempt to connect to it on the blockchain
   */
  loadInfo: (address:string, provider?:Provider) => Promise<JurisdictionInfo>,

  /** Returns the addresses of all available Jurisdictions */
  getAllInfo: () => JurisdictionInfo[],

  /** Access a cached Typechain instance of the given jurisdiction */
  getInstance: (address:string, provider:Provider) => IJSCJurisdiction,

  /** Access the cached contacts of the given jurisdiction */
  loadContracts: (address:string, provider:Provider) => Promise<IContracts>,

  /** Adds the given jurisdiction address to the state */
  add: (info:JurisdictionInfo) => void,

  /** Removes the given jurisdiction address from the state */
  remove: (address:string) => void,
}

/** Create Zustand state with collection of all known jurisdicitons */
export const useJurisdictions = create<IJurisdictionsState>((set, get) => ({
  infos: {} as JurisdictionInfoMap,
  contracts: {} as JurisdictionContractsMap,
  instances: {} as JurisdictionInstanceMap,
  chainId:0,
  loaded: false,

  init: async (chainId:number) => {
    if (get().loaded && chainId === get().chainId)
      return

    await fetch(`/api/contracts/get?interface=IJSCJurisdiction&chainId=${chainId}&frontend=${process.env.NEXT_PUBLIC_FRONTEND||""}`)
    .then(res => res.json() as Promise<JurisdictionInfo[]>)
    .then(res => {
      const details:JurisdictionInfoMap = {}
      res.forEach(j => {
        j.status = process.env.NEXT_PUBLIC_VOLATILE_BLOCKCHAIN === "false" ? JurisdictionStatus.Exists : JurisdictionStatus.Unknown
        details[j.address.toLowerCase()] = {
          ...j,
          createdAt: j.createdAt ? new Date(j.createdAt) : undefined
        }
      })

      set({infos: details, contracts: {}, instances: {}, chainId, loaded:true})
    })
  },

  confirm: async (provider:Provider) => {
    Object.values(get().infos).forEach(async j => {
      if (j.status === JurisdictionStatus.Unknown) {
        const jAddress = j.address.toLowerCase()
        try {
          const instance = await get().getInstance(jAddress, provider)
          await instance.getJurisdictionName()
          set({infos: {...get().infos, [jAddress]: { ...j, status: JurisdictionStatus.Exists } }})
        }
        catch(e) {
          set({infos: {...get().infos, [jAddress]: { ...j, status: JurisdictionStatus.NotFound } }})
        }
      }
    })
  },

  loadInfo: async (address:string, provider?:Provider) => {
    if (!get().loaded)
      throw new Error("useJurisdictions state not initialized")

    address = address.toLowerCase()
    const info:JurisdictionInfo = get().infos[address]
    if (!info && provider) {
      try {
        const instance = await get().getInstance(address, provider)
        const name = await instance.getJurisdictionName()
        const version = "unknown"
        const description = "External Jurisdiction"
        const status = JurisdictionStatus.Exists
        get().add({address, name, version, description, status})
      } catch(e) {
        console.log("Error loading jurisdiction", address, e)
      }
    }
    return info
  },

  /** Returns the addresses of all available Jurisdictions */
  getAllInfo: () => {
    if (!get().loaded)
      throw new Error("useJurisdictions state not initialized")
    
    return Object.values(get().infos)
  },

  /** Access a cached Typechain instance of the given jurisdiction */
  getInstance: (address:string, provider:Provider) => {
    if (!get().loaded)
      throw new Error("useJurisdictions state not initialized")
      
    address = address.toLowerCase()
    const instances = get().instances
    if (instances[address]) 
      return instances[address]

    const instance = IJSCJurisdiction__factory.connect(address, provider)
    instances[address] = instance
    set({instances})

    return instance
  },

  /** Access the cached contacts of the given jurisdiction */
  loadContracts: async (address:string, provider:Provider) => {
    if (!get().loaded)
      throw new Error("useJurisdictions state not initialized")

    address = address.toLowerCase()
    const contracts = get().contracts
    if (contracts[address]) 
      return contracts[address]
    
    const newContracts:IContracts = {
      list: [],
      byName: {}
    }
    try {
      const instance = await get().getInstance(address, provider)
      let i = await instance.iterateParameters()
      while(await instance.isValidParameterIterator(i)){
        const p = await instance.parameterIteratorGet(i);
        if (p.ptype == ParamType.t_address) {
          const a = await instance.getAddressParameter(p.name);
          const c = {name:p.name, address:a.toLowerCase(), description:p.description}
          newContracts.list.push(c)
          newContracts.byName[p.name] = c
        }
        i = await instance.nextParameter(i)
      }
    } catch(e) {
      console.log("Error loading contracts for jurisdiction", address, e)
    }

    set({contracts: {...contracts, [address]: newContracts}})
    return newContracts
  },

  /** Adds the given jurisdiction info to the state */
  add: (newJurisdiction:JurisdictionInfo) => {
    if (!get().loaded)
      throw new Error("useJurisdictions state not initialized")
      
    const info = get().infos
    info[newJurisdiction.address.toLowerCase()] = {...newJurisdiction}
    set({infos: info})
  },

  remove: async (address:string) => {
    if (!get().loaded)
      throw new Error("useJurisdictions state not initialized")

    address = address.toLowerCase()
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({address})
    }

    await fetch("/api/contracts/remove-jurisdiction", request)
      .then((r) => {
        if (r.status === 200) {
          console.log("Removed jurisdiction: ", address)
          const info = {...get().infos}
          delete info[address]
          set({infos: info})
        }
      },
      (e) => {
        console.log("Error removing jurisdiction", e)
      })
  }
}))

