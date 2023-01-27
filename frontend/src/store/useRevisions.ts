import { ParamType } from '@/utils/types';
import { Provider } from '@ethersproject/providers';
import create from 'zustand'
import { IJSCRevisioned, IJSCRevisioned__factory } from '../../typechain-types';

export type IRevision = {
  name: string;
  description: string;
  paramNames: string[];
  paramTypes: ParamType[];
  paramHints: string[];
};

export type IRevisionedDetails = { 
  address: string 
  instance: IJSCRevisioned
  revisions: IRevision[]
  revisionsLoading: boolean

  /** Loads or reloads the revisions. Once loaded, any existing revisions cached for this IJSCRevisioned will be replaced. */
  loadRevisions: () => Promise<void>
};

export type RevisionMap = { [address: string]: IRevisionedDetails }

/*
 * Zustand state to load and cache contract addresses with convenience methods to access the revisions they support
 *
 * State must be initialized with a chainId using the init() function. This can be called as many times as necessary if the chainId changes.
 * It will remove any details cached from a different chainId
 * 
 * The state is accessed with the useRevisions() hook. Individual contracts and their revisions can be accessed get() function. 
 */
export interface IRevisionsState {
  revisions:RevisionMap
  chainId:number

  /** Sets the chainId if the blockchain and clears any existing data if the id changes */
  init: (chainId:number) => Promise<void>,

  isInitialized: () => boolean,

  /** Returns details of the IJSCRevisioned contract stored at the given address */
  get: (address:string, provider:Provider) => IRevisionedDetails,
}

/** Asynchronously loads revisions for the given instance */
const loadRevisions = async (address:string, instance:IJSCRevisioned, get:() => IRevisionsState, set: (state:Partial<IRevisionsState>) => void) => {
  address = address.toLowerCase()
  if (get().revisions[address]?.revisionsLoading || get().revisions[address]?.revisions.length > 0) 
    return

  set({ revisions: { ...get().revisions, [address]: { ...get().revisions[address], revisionsLoading:true } } })
  const revs:IRevision[] = []
  try {
    let rIter = await instance.iterateRevisions()
    while(await instance.isValidRevisionIterator(rIter)){
      const r = await instance.revisionIteratorGet(rIter)
      revs.push({
        name: r.name,
        description: r.description,
        paramNames: r.paramNames,
        paramTypes: r.paramTypes,
        paramHints: r.paramHints
      })
      rIter = await instance.nextRevision(rIter)
    }
  } catch (e) {
    console.error(`Error loading revisions for ${address}`, e)
  }
  set({ revisions: { 
      ...get().revisions, 
      [address]: { 
        ...get().revisions[address],
        revisions: revs,
        revisionsLoading:false 
      } 
    } 
  })
}

/** Create Zustand state with collection of all likes for current user */
export const useRevisions = create<IRevisionsState>((set, get) => ({
  revisions: {} as RevisionMap,
  chainId:0,

  init: async (chainId:number) => {
    if (chainId === get().chainId)
      return

    set({revisions: {}, chainId})
  },

  isInitialized: () => get().chainId !== 0,

  get: (address:string, provider:Provider) => {
    if (get().chainId === 0)
      throw new Error('useRevisions() state not initialized')

    address = address.toLowerCase()
    let details:IRevisionedDetails = get().revisions[address]
    if (!details) {
      const instance = IJSCRevisioned__factory.connect(address, provider)
      details = {
        address,
        instance,
        revisions: [],
        revisionsLoading: false,
        loadRevisions: async () => loadRevisions(address, instance, get, set)
      }
      set({ revisions: { ...get().revisions, [address]: details } })
    }
    return details
  },
}))

