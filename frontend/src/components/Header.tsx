import React from 'react'
import { useWeb3React } from "@web3-react/core";
import { Container, Text, HStack, Image, Flex } from '@chakra-ui/react'
import { MenuItemInterface } from '@/interfaces/index'
import Menu from '@/components/Menu'
import Connect from '@/components/ConnectButton'
import { Link } from './Link';


type Props = {
    siteTitle: string
    ctaText: string
    menu: Array<MenuItemInterface>
}

export function Header(props: Props) {
    const { siteTitle, ctaText, menu } = props;
    const { active } = useWeb3React();

    return (
        <HStack padding='30px 0' margin='0 0 40px 0'>
            <Container
                display='flex'
                width='100%'
                flexDirection='row'
                justifyContent='flex-start'
                maxWidth={'100%'}
                padding='0'>
                <Link href='/' >
                    <Flex>
                        <Image 
                            src='/imgs/logo.svg' 
                            boxSize={{base: '40px', sm: '40px', md: '40px', lg: '40px' }}
                            alt='Jurisdiction Logo' 
                            marginRight={'11px'} />
                        <Text
                            marginInlineStart='0'
                            maxWidth={{ base: '221px' }}
                            fontSize={{ base: '12px', sm: '12px', md: '15px', lg: '15px'  }}
                            fontWeight='700'
                            lineHeight='20px'
                            letterSpacing='0px'
                            textAlign='left'
                            textTransform='uppercase'
                            color='brand.black'>
                            {siteTitle}
                        </Text>
                    </Flex>
                </Link>
            </Container>
            <Container
                display='flex'
                width='100%'
                flexDirection='row'
                justifyContent='flex-end'
                maxWidth={'100%'}
                padding='0'>
                <Connect
                    w='125px'
                    variant='Header'
                    margin='0 10px 0 0'
                    label={ctaText} />
                { 
                    active &&
                    <Menu items={menu} />
                }
            </Container>
        </HStack>
    )
}