import React, { useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import Connect from '@/components/ConnectButton'
import RecentActivity from "@/components/RecentActivity";
import Tag from '@/components/Tag';
import { Flex, Heading, Box, VStack } from "@chakra-ui/layout"
import { CircularProgress, Link, Text } from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'
import { homeLabels, getLabel } from '@/store/initial'
import { useWeb3React } from "@web3-react/core";
import type { NextPage } from 'next';
import useJSCTitleToken from '@/hooks/useJSCTitleToken'
import { Jurisdiction } from 'classes/jurisdiction';

const LoadingIcon = () => <CircularProgress isIndeterminate size="1.3em" color='brand.java'/>
const LoadingCaret = () => <CircularProgress isIndeterminate size="1em" marginRight=".5em" color='brand.java'/>
const MissingCaret = () => <SmallCloseIcon marginRight=".5em" color="brand.coralRed" />

type JurisdictionInfo = {
  address: string
  name: string
  version: string
  description: string
}

type JurisdictionConfirmations = {[address:string]:boolean}

const Home: NextPage = () => {
  const { active, chainId, library: web3Provider } = useWeb3React();
  const {tokens} = useJSCTitleToken('0xa513E6E4b8f2a923D98304ec87F64353C4D5C853')
  //To-do: Get Recent Activity Filtered from custom hook useJSCTitleToken
  const [jurisdictions, setJurisdictions] = useState<JurisdictionInfo[]|undefined>()
  const [confirmedJurisdictions, setConfirmedJurisdictions] = useState<JurisdictionConfirmations>({})
  let checkedJurisdictions = false

  useEffect(() => {
    if (chainId)
      fetch(`api/contracts/get?interface=IJSCJurisdiction&chainId=${chainId}&frontend=${process.env.NEXT_PUBLIC_FRONTEND||""}`)
        .then(res => res.json())
        .then(res => setJurisdictions([...res, {
          address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
          name: 'Test Jurisdiction',
          version: '1.0.0',
          description: 'This is a test jurisdiction'
        }]))
  }, [chainId])

  // Confirm that Jurisdictions still exist (in development only because our dev blockchain is volatile)
  useEffect(() => {
    if (jurisdictions && process.env.NEXT_PUBLIC_VOLATILE_BLOCKCHAIN) {
      if (!checkedJurisdictions) {
        const confirmExists = async () => {
          const signer = await web3Provider.getSigner()
          jurisdictions.forEach(async jurisdiction => {
            Jurisdiction.confirmExists(signer, jurisdiction.address,
              async (address:string) => {
                setConfirmedJurisdictions(cj => ({...cj, [address]: true}))
              },
              async (address:string) => {
                setConfirmedJurisdictions(cj => ({...cj, [address]: false}))
              })
          })
        }
        confirmExists()
      }
      else {
        // assume all jurisdictions exist
        const cj:JurisdictionConfirmations = {}
        jurisdictions.forEach(async j => {
          cj[j.address] = true
        })
        setConfirmedJurisdictions(cj)
      }
      checkedJurisdictions = true // Only do it once per session
    }
  }, [jurisdictions, web3Provider, chainId])

  const getJurisdictionTag = useCallback((jurisdiction:JurisdictionInfo) => {
    if (confirmedJurisdictions[jurisdiction.address] === true)
      return (
        <Link variant={'13/16'} href={`/jurisdiction/${jurisdiction.address}`} key={jurisdiction.address}>
          <Tag key={jurisdiction.address}>
            <Text>{jurisdiction.name} v{jurisdiction.version}</Text>
          </Tag>
        </Link>)
    if (confirmedJurisdictions[jurisdiction.address] === false)
      return (
        <Link key={jurisdiction.address} variant={'13/16'} onClick={async () => Jurisdiction.removeJurisdiction(await web3Provider.getSigner(), jurisdiction.address)}>
          <Tag caret={<MissingCaret/>}>
            <Text>{jurisdiction.name} v{jurisdiction.version}</Text>
          </Tag>
        </Link>)
    return (
      <Tag key={jurisdiction.address} caret={<LoadingCaret/>}>
        <Text>{jurisdiction.name} v{jurisdiction.version}</Text>
      </Tag>)
  }, [confirmedJurisdictions])   
  
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
                <>
                  <Text variant={'15/20-BOLD'} margin='0 0 20px 0'>Jurisdictions</Text>
                  {
                    jurisdictions 
                      ? jurisdictions.map(jurisdiction => getJurisdictionTag(jurisdiction))
                      : <Tag justify='center'><LoadingIcon/></Tag>
                  }
                </>
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
                <Link variant={'13/16'} href='/property-details/title-1/0xa513E6E4b8f2a923D98304ec87F64353C4D5C853'>
                  <Tag>
                    <Text>001-456-87654-E</Text>
                  </Tag>
                </Link>
              </Box>
            </Flex>
          </VStack>
        }
      </></Flex>
    </Box>
  )
}

export default Home