import { ParamType } from '@/utils/types';
import { Provider } from '@ethersproject/providers';
import create from 'zustand'
import { IJSCJurisdiction, IJSCJurisdiction__factory } from '../../typechain-types';

export interface IContract {
  name: string
  address: string
  description: string
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
export type JurisdictionContractsMap = { [address: string]: IContract[] }
export type JurisdictionInstanceMap = { [address: string]: IJSCJurisdiction }

/*
 * Zustand state to load and cache jurisdiction addresses with convenience methods to access typechain instances and some details like the name and contracts 
 *
 * State must be iitialized by loading all known jurisdiction addresses from the database with the init() function. This should be called once from
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
  getInfo: (address:string, provider?:Provider) => Promise<JurisdictionInfo>,

  /** Returns the addresses of all available Jurisdictions */
  getAllInfo: () => JurisdictionInfo[],

  /** Access a cached Typechain instance of the given jurisdiction */
  getInstance: (address:string, provider:Provider) => Promise<IJSCJurisdiction>,

  /** Access the cached contacts of the given jurisdiction */
  getContracts: (address:string, provider:Provider) => Promise<IContract[]>,

  /** Adds the given jurisdiction address to the state */
  add: (info:JurisdictionInfo) => void,
}

/** Create Zustand state with collection of all likes for current user */
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
        details[j.address] = {
          ...j,
          createdAt: j.createdAt ? new Date(j.createdAt) : undefined
        }
      })
      set({infos: details, chainId, loaded:true})
    })
  },

  confirm: async (provider:Provider) => {
    Object.values(get().infos).forEach(async j => {
      if (j.status === JurisdictionStatus.Unknown)
        try {
          const instance = await get().getInstance(j.address, provider)
          await instance.getJurisdictionName()
          set({infos: {...get().infos, [j.address]: { ...j, status: JurisdictionStatus.Exists } }})
        }
        catch(e) {
          set({infos: {...get().infos, [j.address]: { ...j, status: JurisdictionStatus.NotFound } }})
        }
    })
  },

  getInfo: async (address:string, provider?:Provider) => {
    const info:JurisdictionInfo = get().infos[address]
    if (!info && provider) {
      const instance = await get().getInstance(address, provider)
      const name = await instance.getJurisdictionName()
      const version = "unknown"
      const description = "External Jurisdiction"
      const status = JurisdictionStatus.Exists
      get().add({address, name, version, description, status})
    }
    return info
  },

  /** Returns the addresses of all available Jurisdictions */
  getAllInfo: () => Object.values(get().infos),

  /** Access a cached Typechain instance of the given jurisdiction */
  getInstance: async (address:string, provider:Provider) => {
    const instances = get().instances
    if (instances[address]) 
      return instances[address]

    const instance = await IJSCJurisdiction__factory.connect(address, provider)
    instances[address] = instance
    set({instances})
    return instance
  },

  /** Access the cached contacts of the given jurisdiction */
  getContracts: async (address:string, provider:Provider) => {
    const contracts = get().contracts
    if (contracts[address]) 
      return contracts[address]
    
    const newContracts:IContract[] = []
    const instance = await get().getInstance(address, provider)
    let i = await instance.iterateParameters()
    while(await instance.isValidParameterIterator(i)){
      const p = await instance.parameterIteratorGet(i);
      if (p.ptype == ParamType.t_address) {
        let a = await instance.getAddressParameter(p.name);
        newContracts.push({name:p.name, address:a, description:p.description})
        i = await instance.nextParameter(i)
      }
    }

    set({contracts: {...contracts, [address]: newContracts}})
    return newContracts
  },

  /** Adds the given jurisdiction info to the state */
  add: (newJurisdiction:JurisdictionInfo) => {
    const info = get().infos
    info[newJurisdiction.address] = {...newJurisdiction}
    set({infos: info})
  }
}))

