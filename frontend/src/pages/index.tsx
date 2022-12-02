import React, { useState } from 'react'
import Head from 'next/head'
import Connect from '@/components/Connect'
import RecentActivity from "@/components/RecentActivity";
import Tag from '@/components/Tag';
import { Flex, Heading, Box, VStack } from "@chakra-ui/layout"
import { Alert, AlertDescription, AlertIcon, AlertTitle, Text } from '@chakra-ui/react'
import { homeLabels, getLabel } from '@/store/initial'
import { useWeb3React } from "@web3-react/core";
import type { NextPage } from 'next';


const Home: NextPage = () => {
  const [error, setError] = useState<string>("")
  const { active, account } = useWeb3React();

  //To-do: Connect this to real Smart COntracts and BC
  const fakeRecentActivity = [
    {tokenID:'001-456-87654-E', price:'180 ETH', type: 'sellingMe', account: '0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097'},
    {tokenId:'001-456-87654-E', price:'130 ETH', type: 'received', account: '0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097'},
    {tokenId:'001-456-876534-S', price: '57.4 ETH', type: 'made'},
  ]


  return (
    <Box width='100%'>
      <Head> <title>{homeLabels.pageTitle}</title></Head>
      <Flex
        width='100%'
        margin={0}
        flexDirection='column'
      >
        {error &&
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        }
        <Heading
          variant={'80'}
          whiteSpace='pre-line'
          textAlign='left'
          my={4}
          marginBottom='48px'>
          {getLabel(active, homeLabels.mainTitle)}
        </Heading>

        {!active ?
          <Connect
            variant='Heading'
            w='250px'
            label={homeLabels.ctaConnect}
            showError={true} />
          :
          <VStack>    
            <Box w='100%' margin='20px 0 30px 0'>       
              <Text marginBottom='20px' variant={'15/20-BOLD'}>Recent Activity</Text>
              <RecentActivity activities={fakeRecentActivity} />
            </Box>
            <Flex justify={'space-between'} w='100%' h='300px' direction={{ base: 'column', md: 'row', lg: 'row' }}>
              <Box width={'100%'} maxWidth='330px'>
                <Text variant={'15/20-BOLD'} margin='0 0 20px 0'>Jurisdictions</Text>
                <Tag><Text variant={'15/20'}>Costa Rica</Text></Tag>
                <Tag><Text variant={'15/20'}>{`Paul’s Jurisdiction`}</Text></Tag>
                <Tag><Text variant={'15/20'}>{`Bryan’s Jurisdiction`}</Text></Tag>
              </Box>
              <Box width={'100%'} maxWidth='330px'>
                <Text variant={'15/20-BOLD'} margin='0 0 20px 0'>Favorite proposals</Text>
                <Tag><Text variant={'15/20'}>{`Add new Member James`}</Text></Tag>
              </Box>
              <Box width={'100%'} maxWidth='330px'>
                <Text variant={'15/20-BOLD'} margin='0 0 20px 0'>Favorite properties</Text>
                <Tag><Text variant={'15/20'}>{`001-456-87654-E`}</Text></Tag>
              </Box>
            </Flex>
          </VStack>
        }
      </Flex>
    </Box>
  )
}

export default Home