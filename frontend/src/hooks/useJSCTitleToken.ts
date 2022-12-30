import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core"
import { ethers } from 'ethers'
import { Token, Offer } from '@/interfaces/index'
import * as tc from "../../typechain-types"
import { AliasData, reloadAliases } from "@/utils/aliases";

type useJSCTitleTokenHook = {
    tokens:Token[],
    tokenJurisdictionAddress: string,
    loading: boolean,
    error: string};

const useJSCTitleToken = (jscTitleTokenConnect: string):useJSCTitleTokenHook => {
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState(true)
    const { active, account, library } = useWeb3React()
    const [jscTitleToken, setJSCTitleToken] = useState<tc.IJSCTitleToken | undefined>(undefined);
    const [tokenJurisdictionAddress, setTokenJurisdictionAddress] = useState<string>('');
    const [tokens, setTokens] = useState<Token[]>([])
    const [ aliasData, setAliasData ] = useState<AliasData|undefined>()

    useEffect(() => {
        if (active && account && library)
            try {
                setJSCTitleToken(tc.IJSCTitleToken__factory.connect(jscTitleTokenConnect as string, library))
            } catch (err) {
                setError(err as string)
            }
    }, [active, account])

    useEffect(() => {
        reloadAliases().then((data) => {
            setAliasData(data)
        })
    }, [])

    useEffect(() => {
        if (jscTitleToken) {
            const loadData = async () => {
                let _tokens: Token[] = []
                const tokensCounter = await getTotalTokens(jscTitleToken);
                const tkJurisdictionAddress = await jscTitleToken.getJurisdiction();
                for (let ti = 0; ti < tokensCounter; ti++) {
                    const t = await jscTitleToken.tokenAtIndex(ti)
                    const { owner, titleId, offersToBuy, offersToSell, frozen, url } = await getTokenData(jscTitleToken, t, aliasData)
                    const accountInfo = aliasData ? {
                        address: owner,
                        name: aliasData.aliasesByAddress.get(owner.toLowerCase())
                     } : { 
                        name: "", 
                        address: owner 
                    }

                    _tokens.push({
                        tokenId: t.toHexString(),
                        titleId,
                        frozen,
                        owner: accountInfo.name || '',
                        ownerAddress: accountInfo.address,
                        ownerFrozen: await jscTitleToken.isFrozenOwner(owner),
                        url,
                        offersToBuy,
                        offersToSell
                    })
                }
                setTokens(_tokens)
                setTokenJurisdictionAddress(tkJurisdictionAddress);
                setLoading(false)
            }
            loadData().catch(err => {
                console.log(err)
                setError(err.toString())
                setLoading(false)
            })
        }
    }, [jscTitleToken, aliasData])

    return {tokens, tokenJurisdictionAddress, loading, error};
};

const getOffersToBuy = async (jscTitleToken: any, token: any, aliasData:AliasData|undefined) => {
    const offersToBuy: Offer[] = []
    const offersToBuyCount = (await jscTitleToken.countOffersToBuy(token)).toNumber()
    for (let obi = 0; obi < offersToBuyCount; obi++) {
        const ob = await jscTitleToken.offerToBuyAtIndex(token, obi);
        const accountInfo = aliasData ? {
            name: ob.buyer,
            address: aliasData.aliasesByAddress.get(ob.buyer.toLowerCase())
         } : { 
            name: "", 
            address: ob.buyer 
        }

        offersToBuy.push({
            amount: parseFloat(ethers.utils.formatEther(ob.amount)),
            buyer: accountInfo.name,
            buyerAddress: accountInfo.address
        })
    }
    return offersToBuy;
}

const getOffersToSell = async (jscTitleToken: any, token: any, aliasData:AliasData|undefined) => {
    const offersToSell: Offer[] = []
    const osCount = (await jscTitleToken.countOffersToSell(token)).toNumber()
    for (let osi = 0; osi < osCount; osi++) {
        const os = await jscTitleToken.offerToSellAtIndex(token, osi);
        const accountInfo = aliasData ? {
            name: os.buyer,
            address: aliasData.aliasesByAddress.get(os.buyer.toLowerCase())
         } : { 
            name: "", 
            address: os.buyer 
        }
        offersToSell.push({
            amount: parseFloat(ethers.utils.formatEther(os.amount)),
            buyer: accountInfo.name,
            buyerAddress: accountInfo.address
        })
    }
    return offersToSell;
}

const getTotalTokens = async (jscTitleToken: any) => {
    return (await jscTitleToken.totalSupply()).toNumber() || 0;
}

const getTokenData = async (jscTitleToken: any, token: any, aliasData:AliasData|undefined) => {
    const owner = await jscTitleToken.ownerOf(token)
    const url = ""//await jscTitleToken.tokenURI(t)
    const titleId = await jscTitleToken.tokenToTitleId(token)
    const offersToBuy = await getOffersToBuy(jscTitleToken, token, aliasData)
    const offersToSell = await getOffersToSell(jscTitleToken, token, aliasData)
    const frozen  = await jscTitleToken.isFrozenToken(token)
    return {
        owner: owner,
        url: url,
        titleId: titleId,
        offersToBuy: offersToBuy,
        offersToSell: offersToSell,
        frozen: frozen
    }
}

export default useJSCTitleToken;