import { Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import create from 'zustand'
import { IJSCJurisdiction__factory, IJSCTitleToken, IJSCTitleToken__factory } from '../../typechain-types';

export type Offer = {
  buyer: string;
  amount: ethers.BigNumber;
  offeredOn: ethers.BigNumber;
};

/**
 * Details of the token from the URI...to be defined...
 */
export type TokenJSON = {
  id: number
  location: string
  description: string
  images: []
}

export type Token = {
  tokenId: string;
  titleId: string;
  owner?: string;
  frozen?: boolean;
  offersToBuy?: Offer[];
  offersToSell?: Offer[];
  url?: string;
  json?: TokenJSON
  loading: boolean
};

export type TokenIdMap = { [tokenId: string]: Token }

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
      try {
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

          loadPage: async (page:number) => {
            if (get().tokenContracts[jurisdictionAddress].tokensLoading || get().tokenContracts[jurisdictionAddress].tokens.pages[page])
              return

            // Set the loading flag
            set((state) => ({ 
              tokenContracts: { ...state.tokenContracts, 
                [jurisdictionAddress]: { ...state.tokenContracts[jurisdictionAddress], 
                  tokensLoading: true 
                } 
              }
            }))

            try {
              const newIds: string[] = []
              const tokensById = { ...get().tokenContracts[jurisdictionAddress].tokens.tokensById }
              const newTokensById = { } as TokenIdMap

              // First just load the tokenIds
              const startIndex = get().pageSize*(page-1)
              const endIndex = Math.min(startIndex + get().pageSize, get().tokenContracts[jurisdictionAddress].tokenCount)
              for (let ti = startIndex; ti < endIndex; ti++) {
                  const tokenId = await (await instance.tokenAtIndex(ti)).toHexString()
                  const titleId = await instance.tokenToTitleId(tokenId)
                  newIds.push(tokenId)
                  if (!tokensById[tokenId])
                    newTokensById[tokenId] = { tokenId, titleId, loading: true } as Token
              }

              // Add tokenIds and new incomplete Token objects but leave loading flag in true
              set((state) => ({ 
                tokenContracts: { ...state.tokenContracts, 
                  [jurisdictionAddress]: { ...state.tokenContracts[jurisdictionAddress], 
                    tokens: { ...state.tokenContracts[jurisdictionAddress].tokens, 
                      pages: { ...state.tokenContracts[jurisdictionAddress].tokens.pages, 
                        [page]: newIds 
                      },
                      tokensById: { ...state.tokenContracts[jurisdictionAddress].tokens.tokensById, 
                        ...newTokensById
                      }
                    } 
                  } 
                }
              }))

              // Now load the details for these tokens
              newIds.forEach(async (tokenId) => {
                const { owner, offersToBuy, offersToSell, frozen, url } = await getTokenData(instance, tokenId)
                set((state) => ({ 
                  tokenContracts: { ...state.tokenContracts, 
                    [jurisdictionAddress]: { ...state.tokenContracts[jurisdictionAddress], 
                      tokens: { ...state.tokenContracts[jurisdictionAddress].tokens, 
                        tokensById: {
                          ...state.tokenContracts[jurisdictionAddress].tokens.tokensById,
                          [tokenId]: {
                            ...state.tokenContracts[jurisdictionAddress].tokens.tokensById[tokenId],
                            tokenId,
                            owner,
                            offersToBuy,
                            offersToSell,
                            frozen,
                            url,
                            loading: false
                          }
                        }
                      } 
                    } 
                  } 
                }))
              })
            }
            catch (err) {
              console.log(err)
            }
            set((state) => ({ 
              tokenContracts: { ...state.tokenContracts, 
                [jurisdictionAddress]: { 
                  ...state.tokenContracts[jurisdictionAddress], 
                  tokensLoading: false 
                } 
              }
            }))
        },
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
      catch (err) {
        console.log("Error loading token contract", err)
      }
    }
    return details
  },
}))

const updateStateTitlesById = async (jurisdictionAddress: string, instance: IJSCTitleToken,tokenIdAsHex: string, set: any, titleId?: string ) => {
  const { owner, offersToBuy, offersToSell, frozen, url } = await getTokenData(instance, tokenIdAsHex);

  set((state: ITitleTokensState) => ({ 
    tokenContracts: { ...state.tokenContracts, 
      [jurisdictionAddress]: { ...state.tokenContracts[jurisdictionAddress], 
        tokens: { ...state.tokenContracts[jurisdictionAddress].tokens, 
          tokensById: {
            ...state.tokenContracts[jurisdictionAddress].tokens.tokensById,
            [tokenIdAsHex]: {
              ...state.tokenContracts[jurisdictionAddress].tokens.tokensById[tokenIdAsHex],
              tokenId: tokenIdAsHex,
              owner,
              offersToBuy,
              offersToSell,
              frozen,
              url,
              loading: false
            }
          }
        } 
      } 
    } 
  }));

  if (titleId) {
    set((state: ITitleTokensState) => {
      const tokensById = {
        ... state.tokenContracts[jurisdictionAddress].tokens.tokensById,
        [titleId]: {
          ...state.tokenContracts[jurisdictionAddress].tokens.tokensById[titleId],
          tokenId: tokenIdAsHex,
          owner,
          offersToBuy,
          offersToSell,
          frozen,
          url,
          titleId,
          loading: false
        }
      };

      return { 
        tokenContracts: { ...state.tokenContracts, 
          [jurisdictionAddress]: { 
            ...state.tokenContracts[jurisdictionAddress], 
            tokens: {
              tokensById,
              pages: state.tokenContracts[jurisdictionAddress].tokens.pages
            }
          } 
        }
      };
    });
  }
}

const getTokenData = async (jscTitleToken: IJSCTitleToken, token: string) => {
  const owner = await jscTitleToken.ownerOf(token)
  const url = await jscTitleToken.tokenURI(token)
  const offersToBuy = await getOffersToBuy(jscTitleToken, token)
  const offersToSell = await getOffersToSell(jscTitleToken, token)
  const frozen  = await jscTitleToken.isFrozenToken(token)
  return {
      owner: owner,
      url: url,
      offersToBuy: offersToBuy,
      offersToSell: offersToSell,
      frozen: frozen
  }
}

const getOffersToBuy = async (jscTitleToken: IJSCTitleToken, token: string) => {
  const offersToBuy: Offer[] = []
  const offersToBuyCount = (await jscTitleToken.countOffersToBuy(token)).toNumber()
  for (let obi = 0; obi < offersToBuyCount; obi++) {
      const ob = await jscTitleToken.offerToBuyAtIndex(token, obi);
      offersToBuy.push(ob)
  }
  return offersToBuy;
}

const getOffersToSell = async (jscTitleToken: IJSCTitleToken, token: string) => {
  const offersToSell: Offer[] = []
  const osCount = (await jscTitleToken.countOffersToSell(token)).toNumber()
  for (let osi = 0; osi < osCount; osi++) {
      const os = await jscTitleToken.offerToSellAtIndex(token, osi);
      offersToSell.push(os)
  }
  return offersToSell;
}

