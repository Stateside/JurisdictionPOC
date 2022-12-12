import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react';
import useBlockchain from "hooks/useBlockchain";

/**
 * Component that connects to MetaMask and displays an error if MetaMask is not installed or some other error occurred.
 */
const ConnectCheck = () => {
    const { chainId, error } = useBlockchain();

    

    return (
        <>
            {error && <Alert status='error'>
                <AlertIcon />
                <AlertTitle>{error?.name || "Error"}</AlertTitle>
                <AlertDescription>{error?.message}</AlertDescription>
                </Alert>
            }
        </>

    )
}

export default ConnectCheck