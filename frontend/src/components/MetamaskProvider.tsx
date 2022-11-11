import React, { useEffect, useState } from 'react'
import { connectors } from "@/connectors/index";
import { useWeb3React } from '@web3-react/core'
import { CircularProgress } from '@chakra-ui/react'
import { Center } from '@chakra-ui/react'

function MetamaskProvider({ children }: { children: any }) {
    const { active: networkActive, error: networkError, activate: activateNetwork } = useWeb3React()
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        connectors.injected
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

    if (loaded) {
        return children
    }
    return (
        <Center bg='brand.grey.grey01' h='100vh'>
            <CircularProgress isIndeterminate color='brand.java' />
        </Center>
    )
}

export default MetamaskProvider