import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "@/connectors/index";
import { getAccountShortName } from '@/utils/util';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, useDisclosure } from '@chakra-ui/react';
import WalletIcon from '@/components/icons/walletIcon';
import SelectWalletModal from "@/components/Modal";
import useBlockchain from "hooks/useBlockchain";

type Props = {
    label: string
    w: string
    variant: string
    margin?: string
}

/**
 * Component that connects to MetaMask and displays a button with the account number or "Connect".
 */
const ConnectButton = (props: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { account, active, error } = useBlockchain();

    const onclick = () => {
        if (!active) 
            onOpen()
        else
            ; // nothing to do. User must disconnect using MetaMask itself
    }

    return (
        <>
            {!error && <Button
                {...props}
                rightIcon={<WalletIcon />}
                onClick={onclick}
                _hover={{
                    background: "brand.javaHover",
                }}>
                {
                   !active ? props.label : getAccountShortName(account)
                }
            </Button>}
            <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
        </>

    )
}

export default ConnectButton