import { Provider } from '@ethersproject/providers';
import { IRevisionParameter, ParamType } from 'db/interfaces/IRevisionParameter';
import { ethers } from 'ethers';
import create from 'zustand'
import { IJSCGovernor, IJSCGovernor__factory, IJSCJurisdiction__factory, IJSCTitleToken, IJSCTitleToken__factory } from '../../typechain-types';

/**
 * Details of the token from the URI...to be defined...
 */
export interface ITokenDetails {
  id: number
  location: string
  description: string
  images: []
}

/** 
 * Details of a proposal for a governor contract. All of these wil be loaded from our database where all proposal details are stored except for the IRevision objects
 * which cme from the target contracts
 */
export interface ITokenInfo {
  id: string
  titleId: string
  owner: number
  uri: string
  json?: ITokenDetails
}

export type TokenIdMap = { [tokenId: string]: ITokenInfo }

export type TokenIdPage = string[]

export type Tokens = {
  pages: { [pageNo: number]: TokenIdPage }
  tokensById: TokenIdMap
}

export type ITokenContractDetails = { 
  address: string 
  instance: IJSCTitleToken
  tokenCount: number
  tokenName: string
  tokenSymbol: string
  tokenBaseURI: string
  registryAccount?: string
  registryFee?: ethers.BigNumber
  maintainerAccount?: string
  maintainerFee?: ethers.BigNumber
  nftSupport?: boolean
  tokens: Tokens
  tokensLoading: boolean

  /** Loads the details of an individual token and stores it in tokens.tokensById */
  loadToken: (tokenId:string) => Promise<void>
  
  /** Loades a page of tokenIds. */
  loadPage: (page:number) => Promise<void>
};

export type TokenContractMap = { [address: string]: ITokenContractDetails }

/*
 * Zustand state to load and cache token contracts with convenience methods to access tokens and other details
 *
 * State must be initialized with a chainId and pageSize for downloading tokenId's from the contract using the init() function. This can be called as many times as necessary if the chainId changes.
 * It will remove any title contract details cached from a different chainId
 * 
 * The state is accessed with the useTitleTokens() hook. Individual contracts can be accessed with the get() function by passing in the Jurisdiction address. 
 */
export interface ITitleTokensState {
  tokenContracts:TokenContractMap
  chainId:number
  pageSize:number

  /** Sets the chainId of the blockchain and the pageSize and clears any existing data if the id changes */
  init: (chainId:number, pageSize:number) => Promise<void>,
  
  isInitialized: () => boolean,
  
  /** Returns details of the TitleTokens contract belonging to the jurisdiction stored at the given address */
  get: (jurisdictionAddress:string, provider:Provider) => Promise<ITokenContractDetails>,
}

/** Create Zustand state with collection of all TitleToken contracts */
export const useTitleTokens = create<ITitleTokensState>((set, get) => ({
  tokenContracts: {} as TokenContractMap,
  chainId:0,
  pageSize:10,

  init: async (chainId:number, pageSize:number) => {
    if (chainId === get().chainId && get().pageSize === pageSize)
      return

    set({tokenContracts: {}, chainId, pageSize})
  },

  isInitialized: () => get().chainId !== 0,

  get: async (jurisdictionAddress:string, provider:Provider) => {
    if (get().chainId === 0)
      throw new Error('useTitleTokens() state not initialized')
      
    let details:ITokenContractDetails = get().tokenContracts[jurisdictionAddress]
    if (!details) {
      const jscJurisdiction = IJSCJurisdiction__factory.connect(jurisdictionAddress, provider);
      const titleTokenContractAddress = await jscJurisdiction.getAddressParameter("jsc.contracts.tokens")
      const instance = IJSCTitleToken__factory.connect(titleTokenContractAddress, provider)
      const tokenCount = (await instance.totalSupply()).toNumber()
      const tokenName = await instance.name()
      const tokenSymbol = await instance.symbol()
      const tokenBaseURI = (await instance.baseTokenURI()) + "<titleId>"
      const registryAccount = await instance.getAddressParameter("jsc.accounts.registry")
      const maintainerAccount = await instance.getAddressParameter("jsc.accounts.maintainer")
      details = {
        address: titleTokenContractAddress, 
        instance, 
        tokenCount,
        tokenName,
        tokenSymbol,
        tokenBaseURI,
        registryAccount,
        maintainerAccount,
        tokens: { pages: {}, tokensById: {} },
        tokensLoading: false,
        loadToken: async (tokenId:string) => {},
        loadPage: async (page:number) => {},
      }
      set({ tokenContracts: { ...get().tokenContracts, [jurisdictionAddress]: details } })

      instance.getBoolParameter("jsc.nft.enabled").then((enabled) => {
        set((state) => ({ tokenContracts: { ...state.tokenContracts, [jurisdictionAddress]: { ...state.tokenContracts[jurisdictionAddress], nftSupport: enabled } } }))
      })
      instance.getNumberParameter("jsc.fees.registry").then((fee) => {
        set((state) => ({ tokenContracts: { ...state.tokenContracts, [jurisdictionAddress]: { ...state.tokenContracts[jurisdictionAddress], registryFee: fee } } }))
      })
      instance.getNumberParameter("jsc.fees.maintainer").then((fee) => {
        set((state) => ({ tokenContracts: { ...state.tokenContracts, [jurisdictionAddress]: { ...state.tokenContracts[jurisdictionAddress], maintainerFee: fee } } }))
      })
      instance.getAddressParameter("jsc.accounts.registry").then((acc) => {
        set((state) => ({ tokenContracts: { ...state.tokenContracts, [jurisdictionAddress]: { ...state.tokenContracts[jurisdictionAddress], registryAccount: acc } } }))
      })
      instance.getAddressParameter("jsc.accounts.maintainer").then((acc) => {
        set((state) => ({ tokenContracts: { ...state.tokenContracts, [jurisdictionAddress]: { ...state.tokenContracts[jurisdictionAddress], maintainerAccount: acc } } }))
      })
    }
    return details
  },
}))
