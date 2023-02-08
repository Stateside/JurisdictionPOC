import { getAccountShortName } from '@/utils/util';
import { Button, useDisclosure } from '@chakra-ui/react';
import WalletIcon from '@/components/icons/walletIcon';
import SelectWalletModal from "@/components/Modal";
import useBlockchain from "hooks/useBlockchain";
import { useAliases } from '@/store/useAliases';
import { useEffect, useState } from 'react';

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
    const { aliasesByAddress } = useAliases();
    const [ name, setName ] = useState("");

    useEffect(() => {
        let name = account || "";
        if (aliasesByAddress && account) 
            name = aliasesByAddress[account.toLocaleLowerCase()]?.alias
        if (!name && account)
            name = getAccountShortName(account)
        setName(name)
    }, [account, aliasesByAddress])

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
                   !active ? props.label : name
                }
            </Button>}
            <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
        </>

    )
}

export default ConnectButton