import { useEffect } from "react";
import Router from 'next/router'
import { useWeb3React } from "@web3-react/core";
import { connectors } from "@/connectors/index";
import { getAccountShortName, refreshState } from '@/utils/util'
import { Button, useDisclosure } from '@chakra-ui/react'
import WalletIcon from '@/components/icons/WalletIcon'
import SelectWalletModal from "@/components/Modal";

type Props = {
    ctaText: string
}

const Connect = (props: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { account, activate, deactivate, active } = useWeb3React();
    const { ctaText } = props;
    const path = window.location.pathname;

    useEffect(() => {
        const provider = window.localStorage.getItem("provider");
        if (provider) activate(connectors[provider]);
    }, []);

    console.log(account)
    return (
        <>
            <Button
                size='md'
                rightIcon={<WalletIcon />}
                fontWeight='700'
                fontSize='15px'
                lineHeight='20px'
                color='brand.grey.grey04'
                background='brand.java'
                type="button"
                w='125px'
                margin='0 10px 0 0'
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