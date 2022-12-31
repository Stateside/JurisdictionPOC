import { ParamType } from '@/utils/types';
import { Provider } from '@ethersproject/providers';
import create from 'zustand'
import { IJSCJurisdiction, IJSCJurisdiction__factory } from '../../typechain-types';

export interface IContract {
  name: string
  address: string
  description: string
}

type  JurisdictionInfo = { 
  address: string 
  name: string
  version: string
  description: string
};

type JurisdictionInfoMap = { [address: string]: JurisdictionInfo }
type JurisdictionContractsMap = { [address: string]: IContract[] }
type JurisdictionInstanceMap = { [address: string]: IJSCJurisdiction }

/*
 * Zustand state to load and cache jurisdiction addresses with convenience methods to access typechain instances and some details like the name and contracts 
 *
 * The state is accessed with the useJurisdictions() hook. Individual jurisdictions can be accessed get() function. 
 * 
 * New jurisdictions can be added with the add() function. For example after creating a new jurisdicion on the /juridisction/create page.
 */
interface IJurisdictionsState {
  info:JurisdictionInfoMap,
  contracts:JurisdictionContractsMap,
  instances:JurisdictionInstanceMap,
  chainId:number
  loaded:boolean,

  /** Starts loading all the known jurisdiction addresses and details from the database */
  init: (chainId:number) => Promise<void>,

  /** Returns the name, version, and description of the given Jurisdiction */
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
  info: {} as JurisdictionInfoMap,
  contracts: {} as JurisdictionContractsMap,
  instances: {} as JurisdictionInstanceMap,
  chainId:0,
  loaded: false,

  init: async (chainId:number) => {
    if (get().loaded && chainId === get().chainId)
      return

    await fetch(`api/contracts/get?interface=IJSCJurisdiction&chainId=${chainId}&frontend=${process.env.NEXT_PUBLIC_FRONTEND||""}`)
    .then(res => res.json() as Promise<JurisdictionInfo[]>)
    .then(res => {
      const details:JurisdictionInfoMap = {}
      res.forEach(j => details[j.address] = j)
      set({info: details, chainId, loaded:true})
    })
  },

  /** 
   * Returns the name, version, and description of the given Jurisdiction. 
   * If this address was not in the database then it will connect to the blockchain and get the information there
   **/
  getInfo: async (address:string, provider?:Provider) => {
    const info:JurisdictionInfo = get().info[address]
    if (!info && provider) {
      const instance = await get().getInstance(address, provider)
      const name = await instance.getJurisdictionName()
      const version = "unknown"
      const description = "External Jurisdiction"
      get().add({address, name, version, description})
    }
    return info
  },

  /** Returns the addresses of all available Jurisdictions */
  getAllInfo: () => Object.values(get().info),

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
    const info = get().info
    info[newJurisdiction.address] = {...newJurisdiction}
    set({info})
  }
}))

