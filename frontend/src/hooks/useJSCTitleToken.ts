import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core"
import { ethers } from 'ethers'
import { Token, Offer } from '@/interfaces/index'
import * as tc from "../../typechain-types"
import { AliasMap, useAliases } from "@/store/useAliases";

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
    const { loaded: aliasesLoaded, aliases, aliasesByAddress } = useAliases()

    useEffect(() => {
        if (active && account && library)
            try {
                setJSCTitleToken(tc.IJSCTitleToken__factory.connect(jscTitleTokenConnect as string, library))
            } catch (err) {
                setError(err as string)
            }
    }, [active, account])

    useEffect(() => {
        if (jscTitleToken && aliasesLoaded) {
            const loadData = async () => {
                let _tokens: Token[] = []
                const tokensCounter = await getTotalTokens(jscTitleToken);
                const tkJurisdictionAddress = await jscTitleToken.getJurisdiction();
                for (let ti = 0; ti < tokensCounter; ti++) {
                    const t = await jscTitleToken.tokenAtIndex(ti)
                    const { owner, titleId, offersToBuy, offersToSell, frozen, url } = await getTokenData(jscTitleToken, t, aliasesByAddress)
                    const accountInfo = {
                        address: owner,
                        name: aliasesByAddress[owner.toLowerCase()]?.alias || ""
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
    }, [jscTitleToken, aliasesLoaded, aliasesByAddress])

    return {tokens, tokenJurisdictionAddress, loading, error};
};

const getOffersToBuy = async (jscTitleToken: any, token: any, aliasesByAddress:AliasMap) => {
    const offersToBuy: Offer[] = []
    const offersToBuyCount = (await jscTitleToken.countOffersToBuy(token)).toNumber()
    for (let obi = 0; obi < offersToBuyCount; obi++) {
        const ob = await jscTitleToken.offerToBuyAtIndex(token, obi);
        const accountInfo = {
            name: ob.buyer,
            address: aliasesByAddress[ob.buyer.toLowerCase()]?.address || ""
         }

        offersToBuy.push({
            amount: parseFloat(ethers.utils.formatEther(ob.amount)),
            buyer: accountInfo.name,
            buyerAddress: accountInfo.address
        })
    }
    return offersToBuy;
}

const getOffersToSell = async (jscTitleToken: any, token: any, aliasesByAddress:AliasMap) => {
    const offersToSell: Offer[] = []
    const osCount = (await jscTitleToken.countOffersToSell(token)).toNumber()
    for (let osi = 0; osi < osCount; osi++) {
        const os = await jscTitleToken.offerToSellAtIndex(token, osi);
        const accountInfo = {
            name: os.buyer,
            address: aliasesByAddress[os.buyer.toLowerCase()]?.address || ""
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

const getTokenData = async (jscTitleToken: any, token: any, aliasesByAddress:AliasMap) => {
    const owner = await jscTitleToken.ownerOf(token)
    const url = ""//await jscTitleToken.tokenURI(t)
    const titleId = await jscTitleToken.tokenToTitleId(token)
    const offersToBuy = await getOffersToBuy(jscTitleToken, token, aliasesByAddress)
    const offersToSell = await getOffersToSell(jscTitleToken, token, aliasesByAddress)
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