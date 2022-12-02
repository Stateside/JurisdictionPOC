import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "@/connectors/index";
import { getAccountShortName } from '@/utils/util';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, useDisclosure } from '@chakra-ui/react';
import WalletIcon from '@/components/icons/walletIcon';
import SelectWalletModal from "@/components/Modal";

type Props = {
    w: string
    label: string
    variant: string
    margin?: string
    showError: boolean
}

const Connect = (props: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { account, activate, deactivate, active, error } = useWeb3React();
    const { label, variant } = props;

    const buttonProps:any = {...props}
    delete buttonProps["showError"]

    useEffect(() => {
        const provider = window.localStorage.getItem("provider");
        if (provider) activate((connectors as any)[provider], (e) => console.error(e));
    }, []);

    const onclick = () => {
        if (!active) 
            onOpen()
        else
            ; // nothing to do. User must disconnect using MetaMask itself
    }

    return (
        <>
            {!error && <Button
                {...buttonProps}
                variant={variant}
                rightIcon={<WalletIcon />}
                onClick={onclick}
                _hover={{
                    background: "brand.javaHover",
                }}>
                {
                   !active ? label : getAccountShortName(account)
                }
            </Button>}
            <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
            {error && props.showError && <Alert status='error'>
                <AlertIcon />
                <AlertTitle>Sorry!</AlertTitle>
                <AlertDescription>{error?.message}</AlertDescription>
                </Alert>
            }
        </>

    )
}

export default Connect