import { ProposalState } from '@/utils/types';
import { Provider } from '@ethersproject/providers';
import { IRevisionParameter, ParamType } from 'db/interfaces/IRevisionParameter';
import { BigNumber, ethers, Signer } from 'ethers';
import create from 'zustand'
import { IJSCGovernor, IJSCGovernor__factory, IJSCJurisdiction__factory } from '../../typechain-types';

export interface IRevisionDetails {
  id: number
  target: string
  name: string
  description: string
  pdata: string
  parameters: IRevisionParameter[]
}

export interface IVotes {
  againstVotes: BigNumber
  forVotes: BigNumber
  abstainVotes: BigNumber
}

export type WhoHasVotedMap = { [account: string]: boolean }

/** 
 * Details of a proposal for a governor contract. All of these wil be loaded from our database where all proposal details are stored except for the IRevision objects
 * which come from the target contracts
 */
export interface IProposalDetails {
  id: string
  startBlock?: number
  deadline?: number
  proposer?: string
  version?: number
  description?: string
  status?: ProposalState
  revisions?: IRevisionDetails[]
  detailsLoading: boolean
  votes?: IVotes
  whoHasVoted: WhoHasVotedMap

  /** Loads the list of revisions asynchronously. We do this as a separate step because the revisions need to be loaded one by one from the database and the target contract */
  loadDetails: () => Promise<void>

  /** Returns true if the given address has voted on this proposal. Returns undefined if that information is still loading */
  hasVoted: (account:string) => Promise<boolean|undefined>
}

export type ProposalMap = { [id: string]: IProposalDetails }
export type ProposalData = { 
  proposalIds?: string[]
  proposals?: ProposalMap
}

export type IGovernorDetails = ProposalData & { 
  address: string 
  instance: IJSCGovernor
  proposalsLoading: null|Promise<ProposalData>
  allProposalsLoaded?: boolean

  /** Loads or reloads the proposals. Once loaded, any existing proposals cached for this governor will be replaced. */
  loadAllProposals: () => Promise<ProposalData>

  /** Returns an individual proposal */
  loadProposal: (proposalId:string) => Promise<void>

  /** Gets an instance of the Governor using the given Signer which allows you to send transactions to this contract */
  instanceWithSigner: (signer:Signer) => IJSCGovernor
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

  isInitialized: () => boolean,

  /** Returns details of the Governor contract stored at the given address */
  get: (jurisdictionAddress:string, provider:Provider) => Promise<IGovernorDetails>,
  
  /** Clears details about the governer stored at the given address */
  refresh: (jurisdictionAddress:string) => void,
}

const updateProposalDetails = (get:() => IGovernorsState, set: (state:Partial<IGovernorsState>) => void, instance:IJSCGovernor, jurisdictionAddress:string, proposalId:string, newDetails:Partial<IProposalDetails>) => {
  proposalId = proposalId.toLowerCase()
  const governors = get().governors
  const governorDetails = governors[jurisdictionAddress]
  const proposals = governorDetails.proposals
  const proposalDetails = proposals && proposals[proposalId]

  if (!proposalDetails)
    return

  const newProposalDetails = { ...proposalDetails, ...newDetails }
  const newProposals = { ...proposals, [proposalId]: newProposalDetails }
  const newGovernorDetails = { ...governorDetails, proposals: newProposals }
  const newGovernors = { ...governors, [jurisdictionAddress]: newGovernorDetails }
  const newState = { governors: newGovernors }
  
  set(newState)
}

const getVotes = async (instance:IJSCGovernor, proposalId:string) => {
  const [againstVotes, forVotes, abstainVotes ] = await instance.proposalVotes(proposalId)
  return { againstVotes, forVotes, abstainVotes }
}

const loadProposalDetails = async (get:() => IGovernorsState, set: (state:Partial<IGovernorsState>) => void, instance:IJSCGovernor, jurisdictionAddress:string, proposalId:string) => {
  proposalId = proposalId.toLowerCase()
  if (get().governors[jurisdictionAddress].proposals?.[proposalId]?.revisions !== undefined)
    return; // Don't load again if we already have the details
  if (get().governors[jurisdictionAddress].proposals?.[proposalId]?.detailsLoading)
    return; // Don't load again if already loading

  updateProposalDetails(get, set, instance, jurisdictionAddress, proposalId, { detailsLoading: true })

  // Load the proposal details from the database
  return fetch(`/api/proposals/get?governor=${instance.address}&chainId=${get().chainId}&id=${proposalId}`).then(r => r.json()).then(async p => {
    if (p && p.length === 1) {
      const newProposal:Partial<IProposalDetails> = p[0]
      try {
        const votes = await getVotes(instance, proposalId)
        const newProposalDetails = { 
          detailsLoading: false,
          startBlock: newProposal.startBlock,
          deadline: await (await instance.proposalDeadline(proposalId)).toNumber(),
          proposer: newProposal.proposer,
          version: newProposal.version,
          status: await instance.state(proposalId),
          description: newProposal.description,
          votes,
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
        updateProposalDetails(get, set, instance, jurisdictionAddress, proposalId, newProposalDetails)
      } catch (e) {
        console.log("Error loading proposal details", e)
      }
    }
    else {
      const newProposalDetails = { 
        detailsLoading: false,
        startBlock: 0,
        deadline: 0,
        proposer: "",
        version: 0,
        status: await instance.state(proposalId),
        description: "Unrecognized proposal",
        votes: { 
          againstVotes: ethers.constants.Zero, 
          forVotes: ethers.constants.Zero, 
          abstainVotes: ethers.constants.Zero 
        },
        revisions: []
      }
      updateProposalDetails(get, set, instance, jurisdictionAddress, proposalId, newProposalDetails)
    }
  })
}

/** Updates the details of the given governor in the Zustand state */
const updateGovernorDetails = (get:() => IGovernorsState, set: (state:Partial<IGovernorsState>) => void, instance:IJSCGovernor, jurisdictionAddress:string, newDetails:Partial<IGovernorDetails>) => {
  const governors = get().governors
  const governorDetails = governors[jurisdictionAddress]

  if (!governorDetails)
    return

  const newGovernorDetails = { ...governorDetails, ...newDetails }
  const newGovernors = { ...governors, [jurisdictionAddress]: newGovernorDetails }
  const newState = { governors: newGovernors }
  
  set(newState)
}

const hasVoted = async (get:() => IGovernorsState, set: (state:Partial<IGovernorsState>) => void, instance:IJSCGovernor, jurisdictionAddress:string, proposalId:string, account:string) => {
  // If we know the answer return it immediately.
  // If we don't know the answer return undefined immediately but start querying the contract for the answer so it is available the next time this method is called
  account = account.toLowerCase()
  proposalId = proposalId.toLowerCase()
  let hasVoted = get().governors[jurisdictionAddress].proposals?.[proposalId]?.whoHasVoted[account]
  if (hasVoted === undefined)
    try {
      instance.hasVoted(proposalId, account).then(hasVoted => {
        updateProposalDetails(get, set, instance, jurisdictionAddress, proposalId, { whoHasVoted: { [account]: hasVoted } })
      })
    } catch (e) {
      console.log("Error checking if has voted", e)
    }

  return hasVoted
}

/** Loads the given proposal for the given governor unless the proposals are already loading */
const loadProposal = async (get:() => IGovernorsState, set: (state:Partial<IGovernorsState>) => void, instance:IJSCGovernor, jurisdictionAddress:string, proposalId:string) => {
  proposalId = proposalId.toLowerCase()
  const governorDetails = get().governors[jurisdictionAddress]
  if (governorDetails) {
    if (governorDetails.proposalsLoading !== null)
      return // Don't load again if already loading
    if (governorDetails.proposals?.[proposalId])
      return // Don't load again if we already have the details
  }

  let proposalDetails:IProposalDetails|undefined
  try {
    if (await instance.existsProposal(proposalId))
      proposalDetails = {
        id: proposalId,
        detailsLoading: false,
        whoHasVoted: {},
        loadDetails: async () => loadProposalDetails(get, set, instance, jurisdictionAddress, proposalId),
        hasVoted: async (account:string) => hasVoted(get, set, instance, jurisdictionAddress, proposalId, account)
      }
  } catch (e) {
    console.log("Error checking if proposal exists", e)
  }

  if (!proposalDetails)
    proposalDetails = {
      id: proposalId,
      startBlock: 0,
      deadline: 0,
      proposer: '',
      version: 0,
      description: 'Not Found. If this is a new proposal, then please wait a few minutes for the proposal to be confirmed on the blockchain, and then reload this page.',
      status: ProposalState.Expired,
      revisions: [],
      detailsLoading: false,
      votes: {
        againstVotes: ethers.constants.Zero,
        forVotes: ethers.constants.Zero,
        abstainVotes: ethers.constants.Zero,
      },
      whoHasVoted: {},
      loadDetails: async () => {},
      hasVoted: async (account:string) => false,
    }

  const proposalIds:string[] = [...(governorDetails.proposalIds||[]), proposalId]
  const proposals:ProposalMap = { ...(governorDetails.proposals||{}), [proposalId]: proposalDetails }

  updateGovernorDetails(get, set, instance, jurisdictionAddress, { proposalIds, proposals, proposalsLoading: null })
}

/** Asynchronously loads proposals for the given governor */
const loadAllProposals = async (get:() => IGovernorsState, set: (state:Partial<IGovernorsState>) => void, instance:IJSCGovernor, jurisdictionAddress:string):Promise<ProposalData> => {
  let governorDetails = get().governors[jurisdictionAddress]
  if (governorDetails?.proposalsLoading)
    return governorDetails?.proposalsLoading

  if (governorDetails?.proposalIds?.length)
    return { proposalIds: governorDetails.proposalIds, proposals: governorDetails.proposals }

  const getDetails = async () => {
    // Load the proposal IDs from the governor contract
    let governorDetails = get().governors[jurisdictionAddress]
    const proposalIds:string[] = [...(governorDetails.proposalIds||[]) ]
    const proposals:ProposalMap = { ...(governorDetails.proposals||{}) }
    try {
      const cnt = (await instance.proposalCount()).toNumber()
      if (cnt > proposalIds.length) {
        const createProposalDetails = (hex:string):IProposalDetails => {
          return {
            id: hex,
            detailsLoading: false,
            whoHasVoted: {},
            loadDetails: async () => loadProposalDetails(get, set, instance, jurisdictionAddress, hex),
            hasVoted: async (account:string) => hasVoted(get, set, instance, jurisdictionAddress, hex, account)
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

        // Add sample expired proposals
        for (let i = 16; i < 46; i++) {
          const hex = '0x00000000000000000000000000000000000000000000000000000000000000' + i.toString(16)
          if (!proposalIds.includes(hex)) {
            proposalIds.push(hex)
            proposals[hex] = { 
              id: hex,
              detailsLoading: false,
              startBlock: 0,
              deadline: 0,
              proposer: '0x0000000000000000000000000000000000000000000000000000000000000000',
              version: 0,
              status: ProposalState.Expired,
              description: "Sample expired proposal",
              whoHasVoted: {},
              votes: {
                againstVotes: ethers.constants.Zero,
                forVotes: ethers.constants.Zero,
                abstainVotes: ethers.constants.Zero,
              },
              revisions: [{
                id:0,
                target: '0x0000000000000000000000000000000000000000000000000000000000000000',
                description: "Sample revision",
                name: "SampleRevision",
                pdata: "",
                parameters: [{
                  name: "SampleParameter",
                  type: ParamType.t_string,
                  hint: "Sample parameter",
                  value: "Sample value",
                }],
              }],
              loadDetails: async () => {},
              hasVoted: async (account:string) => false
            }
          }
        }
        updateGovernorDetails(get, set, instance, jurisdictionAddress, { proposalIds, proposals, proposalsLoading: null, allProposalsLoaded: true })
      }
      else
        updateGovernorDetails(get, set, instance, jurisdictionAddress, { proposalsLoading: null, allProposalsLoaded: true })
    } catch (e) {
      console.log("Error loading proposals", e)
      updateGovernorDetails(get, set, instance, jurisdictionAddress, { proposalsLoading: null, allProposalsLoaded: true })
    }
    return { proposalIds, proposals }
  }

  const promise = getDetails()
  updateGovernorDetails(get, set, instance, jurisdictionAddress, { ...governorDetails, proposalsLoading: promise })
  return promise
}

/** Create Zustand state with collection of all Governor contracts for current user */
export const useGovernors = create<IGovernorsState>((set, get) => ({
  governors: {} as GovernorMap,
  chainId:0,

  init: async (chainId:number) => {
    if (chainId === get().chainId)
      return

    set({governors: {}, chainId})
  },

  isInitialized: () => get().chainId !== 0,

  get: async (jurisdictionAddress:string, provider:Provider|Signer) => {
    if (get().chainId === 0)
      return {} as IGovernorDetails

    jurisdictionAddress = jurisdictionAddress.toLowerCase()
    let details:IGovernorDetails = get().governors[jurisdictionAddress]
    if (!details) {
      const jscJurisdiction = IJSCJurisdiction__factory.connect(jurisdictionAddress, provider);
      const governorContractAddress = await jscJurisdiction.getContractParameter("jsc.contracts.governor")
      const instance = IJSCGovernor__factory.connect(governorContractAddress, provider)
      details = {
        address: governorContractAddress, 
        instance, 
        proposalsLoading:null,
        loadAllProposals: async () => await loadAllProposals(get, set, instance, jurisdictionAddress),
        loadProposal: async (proposalId:string) => await loadProposal(get, set, instance, jurisdictionAddress, proposalId),
        instanceWithSigner: (signer:Signer) => IJSCGovernor__factory.connect(governorContractAddress, signer)
      }
      set({ governors: { ...get().governors, [jurisdictionAddress]: details } })
    }
    return details
  },

  refresh: (jurisdictionAddress:string) => {
    jurisdictionAddress = jurisdictionAddress.toLowerCase()
    const g = { ...get().governors }
    delete g[jurisdictionAddress]
    set({ governors: g })
  }
}))
