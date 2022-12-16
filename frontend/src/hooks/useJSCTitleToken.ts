import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core"
import { accountsByAddress } from '@/utils/accounts'
import { ethers } from 'ethers'
import { Token, Offer } from '@/interfaces/index'
import * as tc from "../../typechain-types"

const useJSCTitleToken = () => {
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState(true)
    const { active, account, library } = useWeb3React()
    const [jscTitleToken, setJSCTitleToken] = useState<tc.IJSCTitleToken | undefined>(undefined)
    const [tokens, setTokens] = useState<Token[]>([])

    useEffect(() => {
        if (active && account && library)
            try {
                setJSCTitleToken(tc.IJSCTitleToken__factory.connect('0xa513E6E4b8f2a923D98304ec87F64353C4D5C853' as string, library))
            } catch (err) {
                setError(err as string)
            }
    }, [active, account])

    useEffect(() => {
        if (jscTitleToken) {
            const loadData = async () => {
                let _tokens: Token[] = []
                const tokensCounter = await getTotalTokens(jscTitleToken)
                for (let ti = 0; ti < tokensCounter; ti++) {
                    const t = await jscTitleToken.tokenAtIndex(ti)
                    const { owner, titleId, offersToBuy, offersToSell } = await getTokenData(jscTitleToken, t)

                    _tokens.push({
                        tokenId: t.toHexString(),
                        titleId,
                        owner: accountsByAddress[owner.toLowerCase()].name,
                        offersToBuy,
                        offersToSell
                    })
                }
                setTokens(_tokens)
                setLoading(false)
            }
            loadData().catch(err => {
                console.log(err)
                setError(err.toString())
                setLoading(false)
            })
        }
    }, [jscTitleToken])

    return [tokens, loading, error];
};

const getOffersToBuy = async (jscTitleToken: any, token: any) => {
    const offersToBuy: Offer[] = []
    const offersToBuyCount = (await jscTitleToken.countOffersToBuy(token)).toNumber()
    for (let obi = 0; obi < offersToBuyCount; obi++) {
        const ob = await jscTitleToken.offerToBuyAtIndex(token, obi);
        offersToBuy.push({
            amount: parseFloat(ethers.utils.formatEther(ob.amount)),
            buyer: accountsByAddress[ob.buyer.toLowerCase()].name,
        })
    }
    return offersToBuy;
}

const getOffersToSell = async (jscTitleToken: any, token: any) => {
    const offersToSell: Offer[] = []
    const osCount = (await jscTitleToken.countOffersToSell(token)).toNumber()
    for (let osi = 0; osi < osCount; osi++) {
        const os = await jscTitleToken.offerToSellAtIndex(token, osi);
        offersToSell.push({
            amount: parseFloat(ethers.utils.formatEther(os.amount)),
            buyer: accountsByAddress[os.buyer.toLowerCase()].name,
        })
    }
    return offersToSell;
}

const getTotalTokens = async (jscTitleToken: any) => {
    return (await jscTitleToken.totalSupply()).toNumber() || 0;
}

const getTokenData = async (jscTitleToken: any, token: any) => {
    const owner = await jscTitleToken.ownerOf(token)
    const titleId = await jscTitleToken.tokenToTitleId(token)
    const offersToBuy = await getOffersToBuy(jscTitleToken, token)
    const offersToSell = await getOffersToSell(jscTitleToken, token)
    return {
        owner: owner,
        titleId: titleId,
        offersToBuy: offersToBuy,
        offersToSell: offersToSell
    }
}

export default useJSCTitleToken;