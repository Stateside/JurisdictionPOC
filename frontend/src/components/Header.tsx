import React from 'react'
import NextLink from 'next/link'
import { useWeb3React } from "@web3-react/core";
import { Container, Text, HStack, Image, Link } from '@chakra-ui/react'
import { MenuItemInterface } from '@/interfaces/index'
import Menu from '@/components/Menu'
import Connect from '@/components/Connect'


type Props = {
    siteTitle: string
    ctaText: string
    menu: Array<MenuItemInterface>
}

export function Header(props: Props) {
    const { siteTitle, ctaText, menu } = props;
    const { active } = useWeb3React();

    return (
        <HStack padding='2rem 0' margin='0 0 40px 0'>
            <Container
                display='flex'
                width='100%'
                flexDirection='row'
                justifyContent='flex-start'
                maxWidth={'100%'}
                padding='0'>
                <NextLink passHref href='/' >
                    <Link><Image src='/imgs/logo.svg' boxSize='2.6rem' alt='Jurisdiction Logo' marginRight={'11px'} /></Link>
                </NextLink>
                <NextLink passHref href='/' >
                    <Link>
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
                    </Link>
                </NextLink>
            </Container>
            <Container
                display='flex'
                width='100%'
                flexDirection='row'
                justifyContent='flex-end'
                maxWidth={'100%'}
                padding='0'>
                <Connect
                    ctaText={ctaText} />
                { 
                    active &&
                    <Menu items={menu} />
                }
            </Container>
        </HStack>
    )
}