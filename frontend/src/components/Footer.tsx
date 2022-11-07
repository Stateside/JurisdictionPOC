import React from 'react'
import { Container, Text, HStack } from '@chakra-ui/react'

type Props = {}

export function Footer(props: Props) {
    const date = new Date ();
    const copyright = `© ${date.getFullYear()} All rights Reserved`;
    return (
        <HStack 
            width='100%'
            position='absolute'
            bottom='0'
            padding='1rem 0' {...props} >
            <Container 
                borderTop='3px solid' 
                borderColor={'brand.grey.grey04'}
                maxWidth={'100%'} 
                padding='20px 0'>
            <Text
                marginInlineStart='0'
                maxWidth={{ base: '221px' }}
                fontSize={{ base: '15px' }}
                fontWeight='700'
                lineHeight='20px'
                letterSpacing='0px'
                textAlign='left'
                color='brand.black'>
                {
                    copyright
                }
            </Text>
            </Container>
        </HStack>
    )
}