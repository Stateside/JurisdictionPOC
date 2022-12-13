import React, { useEffect, useState } from 'react'
import { connectors } from "@/connectors/index";
import { useWeb3React } from '@web3-react/core'
import Loader from '@/components/Loader';
import { InjectedConnector } from '@web3-react/injected-connector';

function MetamaskProvider({ children }: { children: any }) {
    const { active: networkActive, error: networkError, activate: activateNetwork } = useWeb3React()
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        (connectors.injected as InjectedConnector)
            .isAuthorized()
            .then((isAuthorized) => {
                setTimeout(() => {
                    setLoaded(true)
                    if (isAuthorized && !networkActive && !networkError) {
                        activateNetwork(connectors.injected)
                    }
                }, 1500);
            })
            .catch(() => {
                setLoaded(true)
            })
    }, [activateNetwork, networkActive, networkError])

    return loaded ? children : <Loader />
    
}

export default MetamaskProvider