import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Connect from '@/components/ConnectButton'
import RecentActivity from "@/components/RecentActivity";
import Tag from '@/components/Tag';
import { Flex, Heading, Box, VStack } from "@chakra-ui/layout"
import { Link, Spinner, Text } from '@chakra-ui/react'
import { homeLabels, getLabel } from '@/store/initial'
import { useWeb3React } from "@web3-react/core";
import type { NextPage } from 'next';
import useJSCTitleToken from '@/hooks/useJSCTitleToken'

const GreenSpinner = () => (
  <Spinner
    thickness='2px'
    speed='0.65s'
    emptyColor='gray.200'
    color='green.500'
    size='md'
  />)

const Home: NextPage = () => {
  const { active } = useWeb3React();
  const {tokens} = useJSCTitleToken('0xa513E6E4b8f2a923D98304ec87F64353C4D5C853')
  //To-do: Get Recent Activity Filtered from custom hook useJSCTitleToken
  const [jurisdictions, setJurisdictions] = useState<any[]|undefined>()

  useEffect(() => {
    fetch('api/contracts/get')
    .then(res => res.json())
    .then(res => setJurisdictions(res))
  }, [])

  //To-do: Connect this to real Smart COntracts and BC
  const fakeRecentActivity = [
    { tokenID: '001-456-87654-E', price: '180 ETH', type: 'sellingMe', account: '0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097' },
    { tokenId: '001-456-87654-E', price: '130 ETH', type: 'received', account: '0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097' },
    { tokenId: '001-456-876534-S', price: '57.4 ETH', type: 'made' },
  ]

  return (
    <Box width='100%'>
      <Head> <title>{homeLabels.pageTitle}</title></Head>
      <Flex
        width='100%'
        margin={0}
        flexDirection='column'
      ><>
        <Heading
          variant={'80'}
          whiteSpace='pre-line'
          textAlign='left'
          my={4}
          marginBottom='48px'>
          {getLabel(active, homeLabels.mainTitle)}
        </Heading>
        {
          console.log('BOOM', tokens)
        }
        {!active ?
            <Connect
              variant='Heading'
              w='250px'
              label={homeLabels.ctaConnect} />
          :
          <VStack>
            <Box w='100%' margin='20px 0 30px 0'>
              <Text marginBottom='20px' variant={'15/20-BOLD'}>Recent Activity</Text>
              <RecentActivity activities={fakeRecentActivity} />
            </Box>
            <Flex justify={'space-between'} w='100%' h='300px' direction={{ base: 'column', md: 'row', lg: 'row' }}>
              <Box
                width={'100%'}
                maxWidth={{ base: '100%', sm: '100%', md: '100%', lg: '330px' }}>
                <Text variant={'15/20-BOLD'} margin='0 0 20px 0'>Jurisdictions</Text>
                {
                  jurisdictions ? 
                    jurisdictions.map((jurisdiction: any) => {
                      return (
                        <Tag key={jurisdiction.address}>
                          <Link variant={'13/16'} href={`/jurisdiction/${jurisdiction.address}`}>{`${jurisdiction.name} v${jurisdiction.version}`}</Link>
                        </Tag>
                      )
                    }) :
                    <Tag><GreenSpinner/></Tag>
                }
              </Box>
              <Box
                width={'100%'}
                maxWidth={{ base: '100%', sm: '100%', md: '100%', lg: '330px' }}>
                <Text variant={'15/20-BOLD'} margin='0 0 20px 0'>Favorite proposals</Text>
                <Tag>
                  <Text variant={'15/20'}>{`Add new Member James`}</Text>
                </Tag>
              </Box>
              <Box
                width={'100%'}
                maxWidth={{ base: '100%', sm: '100%', md: '100%', lg: '330px' }}>
                <Text variant={'15/20-BOLD'} margin='0 0 20px 0'>Favorite properties</Text>
                <Tag>
                  <Link variant={'13/16'} href='/property-details'>{`001-456-87654-E`}</Link>
                </Tag>
              </Box>
            </Flex>
          </VStack>
        }
      </></Flex>
    </Box>
  )
}

export default Home