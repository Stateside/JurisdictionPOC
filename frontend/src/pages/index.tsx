import React, { useCallback, useEffect, useState } from 'react'
import Head from 'next/head'
import NextLink from 'next/link'
import Connect from '@/components/ConnectButton'
import RecentActivity from "@/components/RecentActivity";
import Tag from '@/components/Tag';
import { Flex, Heading, Box, VStack } from "@chakra-ui/layout"
import { CircularProgress, Link, Text } from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'
import { homeLabels, getLabel } from '@/store/initial'
import { useWeb3React } from "@web3-react/core";
import type { NextPage } from 'next';
import { Jurisdiction } from 'classes/jurisdiction';
import { JurisdictionMap, useLikes } from '@/store/likes';
import { Like } from 'db/entities/Like';

const LoadingIcon = () => <CircularProgress isIndeterminate size="1.3em" color='brand.java'/>
const LoadingCaret = () => <CircularProgress isIndeterminate size="1em" marginRight=".5em" color='brand.java'/>
const MissingCaret = () => <SmallCloseIcon marginRight=".5em" color="brand.coralRed" />

type LikeURLCreator = (itemId:string, jurisdiction:string) => string
const TokenURLCreator:LikeURLCreator = (titleId:string, jurisdiction:string) => `/property-details/${titleId}/0xa513E6E4b8f2a923D98304ec87F64353C4D5C853` // should be ${jurisdiction} but component not finished
const ProposalURLCreator:LikeURLCreator = (proposalId:string, jurisdiction:string) => `/jurisdiction/${jurisdiction}/proposal/${proposalId}`

type JurisdictionInfo = {
  address: string
  name: string
  version: string
  description: string
}

type JurisdictionConfirmations = {[address:string]:boolean}

const Home: NextPage = () => {
  const { active, chainId, library: web3Provider } = useWeb3React();
  //To-do: Get Recent Activity Filtered from custom hook useJSCTitleToken
  const [jurisdictions, setJurisdictions] = useState<JurisdictionInfo[]|undefined>()
  const [confirmedJurisdictions, setConfirmedJurisdictions] = useState<JurisdictionConfirmations>({})
  const { loaded, likedProposals, likedTokens } = useLikes()
  let checkedJurisdictions = false

  useEffect(() => {
    if (chainId)
      fetch(`api/contracts/get?interface=IJSCJurisdiction&chainId=${chainId}&frontend=${process.env.NEXT_PUBLIC_FRONTEND||""}`)
        .then(res => res.json())
        .then(res => setJurisdictions(res))
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
        <NextLink href={`/jurisdiction/${jurisdiction.address}`} key={jurisdiction.address}>
          <Link variant={'13/16'}>
            <Tag key={jurisdiction.address}>
              <Text>{jurisdiction.name} v{jurisdiction.version}</Text>
            </Tag>
          </Link>
        </NextLink>)
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

  const getFavourites = useCallback((loaded:boolean, jurisdictionMap:JurisdictionMap, getURL:LikeURLCreator, defaultItems:any[]) => {
    if (!loaded)
      return <Tag justify='center'><LoadingIcon/></Tag>

    const getTag = (id:string, name:string, jurisdiction:string) => (
      <NextLink href={getURL(id, jurisdiction)} key={jurisdiction+id}>
        <Link variant={'13/16'}>
          <Tag>
            <Text>{name}</Text>
          </Tag>
        </Link>
      </NextLink>)

    const items:JSX.Element[] = []
    const displayLikedItems: Like[] = []
    const likedJurisdictions = Object.keys(jurisdictionMap)

    // Get all likes for all jurisdictions
    likedJurisdictions.forEach(jId => {
      const likedItemIds = Object.keys(jurisdictionMap[jId])
      likedItemIds.forEach(iId => displayLikedItems.push(jurisdictionMap[jId][iId]))
    })

    // Sort by createdAt date
    displayLikedItems.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    displayLikedItems.forEach(like => {
      items.push(getTag(like.itemId, like.name, like.jurisdiction))
    })

    // If none, then show some "interesting" ones
    if (items.length === 0) {
      items.push(<Text variant={'13/16'} marginBottom={"1em"} key="0">You have no favourite properties. Try these:</Text>)
      defaultItems.forEach(i => items.push(getTag(i.id, i.name, i.jurisdiction)))
    }

    return items
  }, [loaded])

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
                maxWidth={{ base: '100%', sm: '100%', md: '100%', lg: '330px' }}
                ml={{ base: '0', md: '30px' }}
                mr={{ base: '0', md: '30px' }}
              >
                <Text variant={'15/20-BOLD'} margin='0 0 20px 0'>Favorite proposals</Text>
                {getFavourites(loaded, likedProposals, ProposalURLCreator, [{ id: "1", name: 'Add new Member James', jurisdiction: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9' }])}
              </Box>
              <Box
                width={'100%'}
                maxWidth={{ base: '100%', sm: '100%', md: '100%', lg: '330px' }}>
                <Text variant={'15/20-BOLD'} margin='0 0 20px 0'>Favorite properties</Text>
                {getFavourites(loaded, likedTokens, TokenURLCreator, [{ id:"title-1", name: '001-456-87654-E', jurisdiction: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9' }])}
              </Box>
            </Flex>
          </VStack>
        }
      </></Flex>
    </Box>
  )
}

export default Home