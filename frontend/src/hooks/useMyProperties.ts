import { useJurisdictions } from "@/store/useJurisdictions";
import { Token, useTitleTokens } from "@/store/useTitleTokens";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";

export interface MyPropertiesProps {
  tokens: Token[]
  count: number
}

/** Returns an object containing an array of tokens, and an expected number of tokens. If the expected number is less than zero then the count is still loading. */
const useMyProperties = (jurisdiction?: string):MyPropertiesProps => {
  const { account, library } = useWeb3React()
  const { loaded: jurisdictionsLoaded, infos: jurisdictionInfos } = useJurisdictions()
  const { get: getTokens, isInitialized } = useTitleTokens()
  const [tokens, setTokens] = useState<Token[]>([])
  const [count, setCount] = useState(-1)
  
  const loadTokensFromJurisdiction = useCallback((account:string, jurisdiction: string) => {
    getTokens(jurisdiction, library).then((contractDetails) => {
      contractDetails.instance.balanceOf(account!).then(bn => {
        const cnt = bn.toNumber()
        setCount(prev => prev === -1 ? cnt : prev + cnt)
        for (let i = 0; i < cnt; i++) {
          contractDetails.instance.ownerTokenAtIndex(account!, i).then(async tokenId => {
            contractDetails.loadToken(tokenId.toHexString()).then(token => {
              if (token)
                setTokens(prev => [...prev, token])
            })
          })
        }
      })
    })
  }, [library, getTokens])
  
  useEffect(() => {
    if (jurisdiction && account && isInitialized() && jurisdictionsLoaded) {
      setTokens([])
      setCount(-1)
      loadTokensFromJurisdiction(account, jurisdiction)
    }
  }, [jurisdiction, account, isInitialized(), jurisdictionsLoaded, loadTokensFromJurisdiction])
  
  useEffect(() => {
    if (!jurisdiction && account && isInitialized() && jurisdictionsLoaded) {
      setTokens([])
      setCount(-1)
      Object.keys(jurisdictionInfos).forEach(id => loadTokensFromJurisdiction(account, id))
    }
  }, [jurisdiction, account, isInitialized(), jurisdictionsLoaded, loadTokensFromJurisdiction])
  
  return { tokens, count }
}
  
export default useMyProperties