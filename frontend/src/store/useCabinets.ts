import { Provider } from '@ethersproject/providers';
import { BigNumber, ethers } from 'ethers';
import create from 'zustand'
import { IJSCCabinet, IJSCCabinet__factory } from '../../typechain-types';

export type IMember = {
  account: string
  role: string
}

export type MemberMap = { [address: string]: IMember }
export type MemberCheckMap = { [address: string]: boolean }

export type ICabinetDetails = { 
  instance: IJSCCabinet
  members: IMember[]
  membersByAddress: MemberMap
  areMembers: MemberCheckMap
  membersLoading: boolean
  membersLoaded: boolean

  /** Checks if given account is a member. Returns undefined if information is not available yet and you should call again later */
  isMember: (account:string) => Promise<boolean|undefined>

  /** Loads all members from the given cabinet */
  loadMembers: () => Promise<void>
};

export type CabinetMap = { [address: string]: ICabinetDetails }

/*
 * Zustand state to load and cache cabinet addresses with convenience methods to access members and other details
 *
 * State must be initialized with a chainId using the init() function. This can be called as many times as necessary if the chainId changes.
 * It will remove any cabinet details cached from a different chainId
 * 
 * The state is accessed with the useCabinets() hook. Individual cabinets can be accessed get() function. 
 */
export interface ICabinetState {
  cabinets:CabinetMap
  chainId:number

  /** Sets the chainId if the blockchain and clears any existing data if the id changes */
  init: (chainId:number) => Promise<void>,

  /** Starts loading the details of the Cabinet contract stored at the given address. Returns undefined and starts loading the cabinet if it has not been loaded yet */
  get: (address:string, provider:Provider) => ICabinetDetails|undefined,
}

/** Loads the given members for the given cabinet unless the members are already loading */
const loadMembers = async (get:() => ICabinetState, set: (state:Partial<ICabinetState>) => void, instance:IJSCCabinet) => {
  let cabinets = get().cabinets
  let instanceAddress = instance.address.toLowerCase()
  let cabinet = cabinets[instanceAddress]
  if (cabinet.membersLoading || cabinet.membersLoaded)
    return

  set({
    cabinets: {...cabinets, 
      [instanceAddress]: { ...cabinet,
        membersLoading: true
      }
    }
  });

  const members:IMember[] = []
  const membersByAddress:MemberMap = {}
  const areMembers:MemberCheckMap = {}
  try {
    const roleCount = (await instance.getRoleCount()).toNumber();
    for (let r = 0; r < roleCount; r++) {
      const roleId = await instance.getRoleAt(r);
      const roleMemberCount = (await instance.getRoleMemberCount(roleId)).toNumber();
      for (let rm = 0; rm < roleMemberCount; rm++) {
        const acc = (await instance.getRoleMember(roleId, rm)).toLowerCase();
        const m:IMember = {
          account: acc,
          role: roleId,
        };
        members.push(m)
        membersByAddress[acc] = m
        areMembers[acc] = true
      }
    }
  } catch (e) {
    console.error('Error loading members', e)
  }
  cabinets = get().cabinets
  cabinet = { ...cabinets[instanceAddress], 
    members,
    membersByAddress,
    areMembers,
    membersLoading: false,
    membersLoaded: true
  }
  set({cabinets: {...cabinets, [instanceAddress]: cabinet }});
}

/** Checks if the given address is a member of the current cabinet */
const isMember = async (get:() => ICabinetState, set: (state:Partial<ICabinetState>) => void, instance:IJSCCabinet, account:string) => {
  let instanceAddress = instance.address.toLowerCase()
  account = account.toLowerCase()
  const cabinet = get().cabinets[instanceAddress]
  if (cabinet.membersLoaded)
    return cabinet.areMembers[account] === true

  // Check if we are already checked if the given account is a member
  if (cabinet.areMembers[account] !== undefined)
    return cabinet.areMembers[account]

  try {
    // Start checking if the given account is a member
    cabinet.instance.isMember(account).then(res => {
      if (cabinet.areMembers[account] === undefined)
        set({ 
          cabinets: { ...get().cabinets, 
            [instanceAddress]: { ...cabinet, 
              areMembers: { ...cabinet.areMembers, 
                [account]: res 
              } 
            } 
          } 
        })
    })
  } catch (e) {
    console.error('Error checking if user is a member', e)
  }

  return undefined
}

/** Create Zustand state with collection of all likes for current user */
export const useCabinets = create<ICabinetState>((set, get) => ({
  cabinets: {} as CabinetMap,
  chainId:0,

  init: async (chainId:number) => {
    if (chainId === get().chainId)
      return
    
    set({cabinets: {}, chainId})
  },

  get: (address:string, provider:Provider):ICabinetDetails|undefined => {
    if (get().chainId === 0 || !address)
      return undefined
    
    address = address.toLowerCase()
    let details:ICabinetDetails = get().cabinets[address]
    if (!details) {
      const instance = IJSCCabinet__factory.connect(address, provider)
      details = {
        instance, 
        members: [],
        membersByAddress: {},
        areMembers: {},
        membersLoading: false,
        membersLoaded: false,
        isMember: async (account:string) => await isMember(get, set, instance, account),
        loadMembers: async () => loadMembers(get, set, instance),
      }
      set({ cabinets: { ...get().cabinets, [address]: details } })
    }

    return details
  },
}))
