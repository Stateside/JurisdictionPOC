import { connectCheckLabels, useBlockchainLabels } from '@/store/initial';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Icon, Link } from '@chakra-ui/react';
import { AddIcon, ExternalLinkIcon, RepeatIcon } from '@chakra-ui/icons'
import useBlockchain from "hooks/useBlockchain";
import { useEffect, useState } from 'react';

enum Status { Okay, Error, SwitchChain, AddChain }

/**
 * Component that connects to MetaMask and displays an error if MetaMask is not installed or some other error occurred.
 * May directs the user to switch chains if not connected to the correct chain
 * May direct the user to add the correct chain if not already added to MetaMask
 */
const ConnectCheck = () => {
    const { chainId, web3Provider, error } = useBlockchain();
    const [ status, setStatus ] = useState(Status.Okay)
    
    const expectedChainId:string = "0x"+parseInt(process.env.NEXT_PUBLIC_CHAIN_ID||"0").toString(16)

    console.log("chain", chainId, expectedChainId)

    const addChain = async () => {
        try {
            await web3Provider.provider.request({
                method: 'wallet_addEthereumChain',
                params: [{
                    chainId:            expectedChainId,
                    chainName:          process.env.NEXT_PUBLIC_CHAIN_NAME||null,
                    rpcUrls:            process.env.NEXT_PUBLIC_CHAIN_RPC_URL?[process.env.NEXT_PUBLIC_CHAIN_RPC_URL]:null,
                    blockExplorerUrls:  process.env.NEXT_PUBLIC_CHAIN_BLOCK_EXPLORER_URL?[process.env.NEXT_PUBLIC_CHAIN_BLOCK_EXPLORER_URL]:null,
                    nativeCurrency: {
                        symbol: process.env.NEXT_PUBLIC_CHAIN_SYMBOL||null,
                        decimals: process.env.NEXT_PUBLIC_CHAIN_DECIMALS?parseInt(process.env.NEXT_PUBLIC_CHAIN_DECIMALS):18
                    }
                }]
            });
        } catch (err) {
        }
    }

    const switchChain = async () => {
        try {
            await web3Provider.provider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: expectedChainId }],
            });
        } catch (err:any) {
            if (err.code === 4902) // This error code indicates that the chain has not been added to MetaMask.
                setStatus(Status.AddChain)
            else
                setStatus(Status.SwitchChain)
        }
    }

    useEffect(() => {
        setStatus(Status.Okay)
        if (web3Provider && chainId && chainId.toString() !== process.env.NEXT_PUBLIC_CHAIN_ID)
            setStatus(Status.SwitchChain)
    }, [chainId, expectedChainId, web3Provider])

    return (
        <>
            {error && error?.message === useBlockchainLabels.pleaseInstall &&
                <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>{error?.name || connectCheckLabels.error}</AlertTitle>
                    <AlertDescription>{error?.message}<Button rightIcon={<ExternalLinkIcon/>} colorScheme='blackAlpha' style={{marginLeft: "10px"}} onClick={() => window.open("https://metamask.io/", "_blank")}>Go to MetaMask...</Button></AlertDescription>
                </Alert>
            }

            {error && error?.message !== useBlockchainLabels.pleaseInstall &&
                <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>{error?.name || connectCheckLabels.error}</AlertTitle>
                    <AlertDescription>{error?.message}</AlertDescription>
                </Alert>
            }

            {status === Status.SwitchChain && 
                <Alert status='warning'>
                    <AlertIcon />
                    <AlertTitle>{connectCheckLabels.warning}</AlertTitle>
                    <AlertDescription>{connectCheckLabels.switchChain}<Button rightIcon={<RepeatIcon/>} colorScheme='blackAlpha' style={{marginLeft: "10px"}} onClick={() => switchChain()}>Switch Chains...</Button></AlertDescription>
                </Alert>
            }

            {status === Status.AddChain && 
                <Alert status='warning'>
                    <AlertIcon />
                    <AlertTitle>{connectCheckLabels.warning}</AlertTitle>
                    <AlertDescription>{connectCheckLabels.addChain}<Button rightIcon={<AddIcon/>} colorScheme='blackAlpha' style={{marginLeft: "10px"}} onClick={() => addChain()}>Add Chain...</Button></AlertDescription>
                </Alert>
            }
        </>

    )
}

export default ConnectCheck