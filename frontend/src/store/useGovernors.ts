import { Provider } from '@ethersproject/providers';
import { IRevisionParameter, ParamType } from 'db/interfaces/IRevisionParameter';
import create from 'zustand'
import { IJSCGovernor, IJSCGovernor__factory } from '../../typechain-types';

export interface IRevisionDetails {
  id: number
  target: string
  name: string
  description: string
  pdata: string
  parameters: IRevisionParameter[]
}

/** 
 * Details of a proposal for a governor contract. All of these wil be loaded from our database where all proposal details are stored except for the IRevision objects
 * which cme from the target contracts
 */
export interface IProposalDetails {
  id: string
  startBlock?: number
  deadline?: number
  proposer?: string
  version?: number
  description?: string
  revisions?: IRevisionDetails[]
  detailsLoading: boolean

  /** Loads the list of revisions asynchronously. We do this as a separate step because the revisions need to be loaded one by one from the database and the target contract*/
  loadDetails: () => Promise<void>
}

export type ProposalMap = { [id: string]: IProposalDetails }

export type IGovernorDetails = { 
  address: string 
  instance: IJSCGovernor
  proposalIds?: string[]
  proposals?: ProposalMap
  proposalsLoading: boolean
  allProposalsLoaded?: boolean

  /** Loads or reloads the proposals. Once loaded, any existing proposals cached for this governor will be replaced. */
  loadAllProposals: () => Promise<void>

  /** Returns an individual proposal */
  loadProposal: (proposalId:string) => Promise<void>
};

export type GovernorMap = { [address: string]: IGovernorDetails }

/*
 * Zustand state to load and cache governor addresses with convenience methods to access proposals and other details
 *
 * State must be initialized with a chainId using the init() function. This can be called as many times as necessary if the chainId changes.
 * It will remove any governor details cached from a different chainId
 * 
 * The state is accessed with the useGovernors() hook. Individual governors can be accessed get() function. 
 */
export interface IGovernorsState {
  governors:GovernorMap
  chainId:number

  /** Sets the chainId if the blockchain and clears any existing data if the id changes */
  init: (chainId:number) => Promise<void>,

  /** Returns details of the Governor contract stored at the given address */
  get: (address:string, provider:Provider) => IGovernorDetails,
}

const updateProposalDetails = (get:() => IGovernorsState, set: (state:Partial<IGovernorsState>) => void, instance:IJSCGovernor, proposalId:string, newDetails:Partial<IProposalDetails>) => {
  const governors = get().governors
  const governorDetails = governors[instance.address]
  const proposals = governorDetails.proposals
  const proposalDetails = proposals && proposals[proposalId]

  if (!proposalDetails)
    return

  const newProposalDetails = { ...proposalDetails, ...newDetails }
  const newProposals = { ...proposals, [proposalId]: newProposalDetails }
  const newGovernorDetails = { ...governorDetails, proposals: newProposals }
  const newGovernors = { ...governors, [instance.address]: newGovernorDetails }
  const newState = { governors: newGovernors }
  
  set(newState)
}

const loadProposalDetails = async (get:() => IGovernorsState, set: (state:Partial<IGovernorsState>) => void, instance:IJSCGovernor, proposalId:string) => {
  if (get().governors[instance.address].proposals?.[proposalId]?.startBlock)
    return; // Don't load again if we already have the details
  if (get().governors[instance.address].proposals?.[proposalId]?.detailsLoading)
    return; // Don't load again if already loading

  updateProposalDetails(get, set, instance, proposalId, { detailsLoading: true })

  // Load the proposal details from the database
  fetch(`/api/proposals/get?governor=${instance.address}&chainId=${get().chainId}&id=${proposalId}`).then(r => r.json()).then(p => {
    if (p && p.length === 1) {
      const newProposal:Partial<IProposalDetails> = p[0]
      const newProposalDetails = { 
        detailsLoading: false,
        startBlock: newProposal.startBlock,
        deadline: newProposal.deadline,
        proposer: newProposal.proposer,
        version: newProposal.version,
        description: newProposal.description,
        revisions: newProposal.revisions?.map(r => ({
          id:r.id,
          target: r.target,
          description: r.description,
          name: r.name,
          pdata: r.pdata,
          parameters: r.parameters.map((p:any) => ({
            name: p.name,
            type: p.type,
            hint: p.hint,
            value: p.value,
          })),
        }))
      }
      updateProposalDetails(get, set, instance, proposalId, newProposalDetails)
    }
  })
}

/** Updates the details of the given governor in the Zustand state */
const updateGovernorDetails = (get:() => IGovernorsState, set: (state:Partial<IGovernorsState>) => void, instance:IJSCGovernor, newDetails:Partial<IGovernorDetails>) => {
  const governors = get().governors
  const governorDetails = governors[instance.address]

  if (!governorDetails)
    return

  const newGovernorDetails = { ...governorDetails, ...newDetails }
  const newGovernors = { ...governors, [instance.address]: newGovernorDetails }
  const newState = { governors: newGovernors }
  
  set(newState)
}

/** Loads the given proposal for the given governor unless the proposals are already loading */
const loadProposal = async (get:() => IGovernorsState, set: (state:Partial<IGovernorsState>) => void, instance:IJSCGovernor, proposalId:string) => {
  const governorDetails = get().governors[instance.address]
  if (governorDetails) {
    if (governorDetails.proposalsLoading)
      return // Don't load again if already loading
    if (governorDetails.proposals?.[proposalId])
      return // Don't load again if we already have the details
  }

  let proposalDetails:IProposalDetails|undefined
  if (await instance.existsProposal(proposalId))
    proposalDetails = {
      id: proposalId,
      detailsLoading: false,
      loadDetails: async () => loadProposalDetails(get, set, instance, proposalId)
    }
  else
    proposalDetails = {
      id: proposalId,
      startBlock: 0,
      deadline: 0,
      proposer: 'Not Found',
      version: 0,
      description: 'Not Found',
      revisions: [],
      detailsLoading: false,
      loadDetails: async () => {}
    }

  const proposalIds:string[] = [...(governorDetails.proposalIds||[]), proposalId]
  const proposals:ProposalMap = { ...(governorDetails.proposals||{}), [proposalId]: proposalDetails }

  updateGovernorDetails(get, set, instance, { proposalIds, proposals, proposalsLoading: false })
}

/** Asynchronously loads proposals for the given governor */
const loadAllProposals = async (get:() => IGovernorsState, set: (state:Partial<IGovernorsState>) => void, instance:IJSCGovernor) => {
  const governorDetails = get().governors[instance.address]
  if (governorDetails?.proposalsLoading)
    return

  updateGovernorDetails(get, set, instance, { ...governorDetails, proposalsLoading: true })

  // Load the proposal IDs from the governor contract
  const proposalIds:string[] = [...(governorDetails.proposalIds||[]) ]
  const proposals:ProposalMap = { ...(governorDetails.proposals||{}) }
  const cnt = (await instance.proposalCount()).toNumber()
  if (cnt > proposalIds.length) {
    const createProposalDetails = (hex:string) => {
      return {
        id: hex,
        detailsLoading: false,
        loadDetails: async () => loadProposalDetails(get, set, instance, hex)
      }
    }
    for (let pi = 0; pi < cnt; pi++) {
      const p = await instance.proposalAtIndex(pi)
      const hex = p.toHexString()
      if (!proposalIds.includes(hex)) {
        proposalIds.push(hex)
        proposals[hex] = createProposalDetails(hex)
      }
    }
    updateGovernorDetails(get, set, instance, { proposalIds, proposals, proposalsLoading: false, allProposalsLoaded: true })
  }
  else
    updateGovernorDetails(get, set, instance, { proposalsLoading: false, allProposalsLoaded: true })
}

/** Create Zustand state with collection of all likes for current user */
export const useGovernors = create<IGovernorsState>((set, get) => ({
  governors: {} as GovernorMap,
  chainId:0,

  init: async (chainId:number) => {
    if (chainId === get().chainId)
      return

    set({governors: {}, chainId})
  },

  get: (address:string, provider:Provider) => {
    if (get().chainId === 0)
      throw new Error('useGovernors() state not initialized')

    let details:IGovernorDetails = get().governors[address]
    if (!details) {
      const instance = IJSCGovernor__factory.connect(address, provider)
      details = {
        address, 
        instance, 
        proposalsLoading:false,
        loadAllProposals: async () => await loadAllProposals(get, set, instance),
        loadProposal: async (proposalId:string) => await loadProposal(get, set, instance, proposalId),
      }
      set({ governors: { ...get().governors, [address]: details } })
    }
    return details
  },
}))
