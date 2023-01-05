import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import Connect from '@/components/ConnectButton'
import RecentActivity from "@/components/RecentActivity";
import Tag from '@/components/Tag';
import { Flex, Heading, Box, VStack } from "@chakra-ui/layout"
import { CircularProgress, Text } from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'
import { homeLabels, getLabel } from '@/store/initial'
import { useWeb3React } from "@web3-react/core";
import type { NextPage } from 'next';
import { Jurisdiction } from 'classes/jurisdiction';
import { JurisdictionMap, useLikes } from '@/store/useLikes';
import { Like } from 'db/entities/Like';
import { Link } from '@/components/Link';
import { JurisdictionInfo, JurisdictionStatus, useJurisdictions } from '@/store/useJurisdictions';

const LoadingIcon = () => <CircularProgress isIndeterminate size="1.3em" color='brand.java'/>
const LoadingCaret = () => <CircularProgress isIndeterminate size="1em" marginRight=".5em" color='brand.java'/>
const MissingCaret = () => <SmallCloseIcon marginRight=".5em" color="brand.coralRed" />

type LikeURLCreator = (itemId:string, jurisdiction:string) => string
const TokenURLCreator:LikeURLCreator = (titleId:string, jurisdiction:string) => `/property-details/${titleId}/0xa513E6E4b8f2a923D98304ec87F64353C4D5C853` // should be ${jurisdiction} but component not finished
const ProposalURLCreator:LikeURLCreator = (proposalId:string, jurisdiction:string) => `/jurisdiction/${jurisdiction}/proposal/${proposalId}`

type Sortable = { createdAt?:Date }
const sortDescending = (a:Sortable,b:Sortable) => {
  return (b.createdAt?.getTime()||0) - (a.createdAt?.getTime()||0)
}

const Home: NextPage = () => {
  const { active, chainId, library: web3Provider } = useWeb3React();
  //To-do: Get Recent Activity Filtered from custom hook useJSCTitleToken
  const { loaded: likesReady, likedProposals, likedTokens } = useLikes()
  
  const { 
    loaded: jurisdictionsLoaded, 
    infos: jurisdictionInfos, 
    confirm: confirmJurisdictionsExist,
    remove: removeJurisdiction
  } = useJurisdictions()
  
  const sortedJurisdictions = useMemo(() => 
    Object.values(jurisdictionInfos).sort(sortDescending), [jurisdictionInfos])

  useEffect(() => {
    confirmJurisdictionsExist(web3Provider)
  }, [web3Provider, jurisdictionInfos])

  const getJurisdictionTag = useCallback((jurisdiction:JurisdictionInfo) => {
    if (jurisdiction.status === JurisdictionStatus.Exists)
      return (
        <Link href={`/jurisdiction/${jurisdiction.address}`} variant={'13/16'} key={jurisdiction.address}>
          <Tag key={jurisdiction.address}>
            <Text>{jurisdiction.name} v{jurisdiction.version}</Text>
          </Tag>
        </Link>)
    if (jurisdiction.status === JurisdictionStatus.NotFound)
      return (
        <Link key={jurisdiction.address} variant={'13/16'} onClick={async () => removeJurisdiction(jurisdiction.address)}>
          <Tag caret={<MissingCaret/>}>
            <Text>{jurisdiction.name} v{jurisdiction.version}</Text>
          </Tag>
        </Link>)
    return (
      <Tag key={jurisdiction.address} caret={<LoadingCaret/>}>
        <Text>{jurisdiction.name} v{jurisdiction.version}</Text>
      </Tag>)
  }, [])
  
  //To-do: Connect this to real Smart COntracts and BC
  const fakeRecentActivity = [
    { tokenID: '001-456-87654-E', price: '180 ETH', type: 'sellingMe', account: '0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097' },
    { tokenId: '001-456-87654-E', price: '130 ETH', type: 'received', account: '0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097' },
    { tokenId: '001-456-876534-S', price: '57.4 ETH', type: 'made' },
  ]

  const getFavourites = useCallback((jurisdictionMap:JurisdictionMap, getURL:LikeURLCreator, defaultItems:any[]) => {
    if (!likesReady)
      return <Tag justify='center'><LoadingIcon/></Tag>

    const getTag = (id:string, name:string, jurisdiction:string) => (
      <Link href={getURL(id, jurisdiction)} variant={'13/16'} key={jurisdiction+id}>
        <Tag>
          <Text>{name}</Text>
        </Tag>
      </Link>)

    const items:JSX.Element[] = []
    const displayLikedItems: Like[] = []
    const likedJurisdictions = Object.keys(jurisdictionMap)

    // Get all likes for all jurisdictions
    likedJurisdictions.forEach(jId => {
      const likedItemIds = Object.keys(jurisdictionMap[jId])
      likedItemIds.forEach(iId => displayLikedItems.push(jurisdictionMap[jId][iId]))
    })

    // Sort by createdAt date
    displayLikedItems.sort(sortDescending)
    displayLikedItems.forEach(like => {
      items.push(getTag(like.itemId, like.name, like.jurisdiction))
    })

    // If none, then show some "interesting" ones
    if (items.length === 0) {
      defaultItems.forEach(i => items.push(getTag(i.id, i.name, i.jurisdiction)))
      items.push(<Text variant={'13/16'} key="0">You have no favorite properties. Try the above:</Text>)
    }

    return items
  }, [likesReady])

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
                    jurisdictionsLoaded 
                      ? sortedJurisdictions.map(jurisdiction => getJurisdictionTag(jurisdiction))
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
                {getFavourites(likedProposals, ProposalURLCreator, [{ id: "1", name: 'Add new Member James', jurisdiction: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9' }])}
              </Box>
              <Box
                width={'100%'}
                maxWidth={{ base: '100%', sm: '100%', md: '100%', lg: '330px' }}>
                <Text variant={'15/20-BOLD'} margin='0 0 20px 0'>Favorite properties</Text>
                {getFavourites(likedTokens, TokenURLCreator, [{ id:"title-1", name: '001-456-87654-E', jurisdiction: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9' }])}
              </Box>
            </Flex>
          </VStack>
        }
      </></Flex>
    </Box>
  )
}

export default Home