import { useEffect } from "react";
import Router from 'next/router'
import { useWeb3React } from "@web3-react/core";
import { connectors } from "@/connectors/index";
import { getAccountShortName, refreshState } from '@/utils/util'
import { Button, useDisclosure } from '@chakra-ui/react'
import WalletIcon from '@/components/icons/WalletIcon'
import SelectWalletModal from "@/components/Modal";

type Props = {
    w: string
    ctaText: string
    variant: string
    margin?: string
}

const Connect = (props: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { account, activate, deactivate, active } = useWeb3React();
    const { ctaText, variant } = props;
    const path = window.location.pathname;

    useEffect(() => {
        const provider = window.localStorage.getItem("provider");
        if (provider) activate(connectors[provider]);
    }, []);

    return (
        <>
            <Button
                {...props}
                variant={variant}
                rightIcon={<WalletIcon />}
                onClick={!active ? onOpen : () => {
                    refreshState()
                    deactivate()
                    Router.reload(path)
                }}
                _hover={{
                    background: "brand.javaHover",
                }}>
                {
                   !active ? ctaText : getAccountShortName(account)
                }
            </Button>
            <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
        </>

    )
}

export default Connect