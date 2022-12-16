import { useEffect, useState } from "react";
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

const pleaseLoginError = {name:useBlockchainLabels.warning, message:useBlockchainLabels.pleaseLogin}
const pleaseInstallError = {name:useBlockchainLabels.error, message:useBlockchainLabels.pleaseInstall}

/**
 * This hook activates and connects to the injected provider or returns an appropriate error message 
 */
const useBlockChain = ():UseBlockchainType => {
    const { account, activate, active, chainId, error, library } = useWeb3React();
    const [localError, setLocalError] = useState<Error|undefined>()

    const clearLocalError = async () => { setLocalError(undefined) }

    const provider = window.localStorage.getItem("provider");
    useEffect(() => {
        clearLocalError()
        if (provider)
            activate(connectors[provider]);
    }, [provider]);

    useEffect(() => {
        if (error) {
            if (error.message.includes("Please wait"))
                setLocalError(pleaseLoginError)
            else if (error.message.includes("No Ethereum provider"))
                setLocalError(pleaseInstallError)
            else 
                setLocalError(error)
        }
        else
            clearLocalError()
    }, [error]);

    return {
        account,
        active,
        chainId,
        error: localError,
        web3Provider: library
    }
}

export default useBlockChain