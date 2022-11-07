import React from 'react'
import { Container, Button, Text, HStack, Image } from '@chakra-ui/react'
import { useEthersState } from '@/store/AccountData'
import WalletIcon from '@/components/icons/walletIcon'

type Props = {
    siteTitle: string
    ctaText: string
}

interface GetAccountShortName {
     
}

export function Header(props: Props) {
    const { siteTitle, ctaText } = props;
    const ethersState = useEthersState()

    const getAccountShortName = (account: string, ctaDefault: string): string => {
        if (account !== '') {
            const mainChars = account.slice(0, 6)
            const lastChars = account.slice(-2)
            const accountShortName = `${mainChars}...${lastChars}`;
            return accountShortName;
        }
        return ctaDefault;

    }
    // console.log('WHAT ABOUT THIS:', ethersState)
    const accountID = getAccountShortName(ethersState.account, ctaText)
    return (
        <HStack padding='2rem 0' margin='0 0 40px 0'>
            <Image src='/imgs/logo.svg' boxSize='2.6rem' alt='Jurisdiction Logo' marginRight={'11px'} />
            <Text
                marginInlineStart='0'
                maxWidth={{ base: '221px' }}
                fontSize={{ base: '15px' }}
                fontWeight='700'
                lineHeight='20px'
                letterSpacing='0px'
                textAlign='left'
                color='brand.black'>
                {siteTitle}
            </Text>
            <Container maxWidth={'100%'} padding='0'>
                <Button
                    float='right'
                    size='md'
                    rightIcon={<WalletIcon />}
                    fontWeight='700'
                    fontSize='15px'
                    lineHeight='20px'
                    color='brand.grey.grey04'
                    background='brand.java' type="button" w='125px'
                    onClick={() => {
                        ethersState?.account === '' && ethersState?.connect()
                        getAccountShortName(ethersState.account)
                    }
                    }
                    _hover={{
                        background: "brand.javaHover",
                    }}>
                    {accountID}
                </Button>
            </Container>
        </HStack>
    )
}