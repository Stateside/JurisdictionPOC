import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "@/connectors/index";
import { useBlockchainLabels } from "@/store/initial";

type UseBlockchainType = {
    account?: null | string;
    active: boolean
    chainId?: number
    error?: Error|undefined
    web3Provider?: any
}

const isError = (err:Error|undefined) => err && (err.name || err.message)

/**
 * This hook activates and connects to the injected provider or returns an appropriate error message 
 */
const useBlockChain = ():UseBlockchainType => {
    const { account, activate, active, chainId, error, library, setError } = useWeb3React();

    useEffect(() => {
        const provider = window.localStorage.getItem("provider");
        setError({name: "", message: ""})
        if (provider) {
            activate(connectors[provider], (e) => {
                if (e?.message && e.message.includes("Please wait"))
                    setError({name:useBlockchainLabels.warning, message:useBlockchainLabels.pleaseLogin})
                else if (e?.message && e.message.includes("No Ethereum provider"))
                    setError({name:useBlockchainLabels.error, message:useBlockchainLabels.pleaseInstall})
                else
                    setError(e)
            });
        }
    }, []);

    return {
        account,
        active,
        chainId,
        error: isError(error) ? error : undefined,
        web3Provider: library
    }
}

export default useBlockChain