import usePersona from "@/store/usePersona";
import React, { useCallback, useEffect, useMemo } from 'react'
import Head from 'next/head'
import Connect from '@/components/ConnectButton'
import RecentActivity from "@/components/RecentActivity";
import Tag from '@/components/Tag';
import { Flex, Heading, Box, VStack } from "@chakra-ui/layout"
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, CircularProgress, HStack, ListItem, Text, UnorderedList, useDisclosure } from '@chakra-ui/react'
import { ChevronRightIcon, SmallCloseIcon } from '@chakra-ui/icons'
import { homeLabels, getLabel } from '@/store/initial'
import { useWeb3React } from "@web3-react/core";
import type { NextPage } from 'next';
import { JurisdictionMap, LikeAction, useLikes } from '@/store/useLikes';
import { ILike } from 'db/interfaces/ILike';
import { Link } from '@/components/Link';
import { JurisdictionInfo, JurisdictionStatus, useJurisdictions } from '@/store/useJurisdictions';
import MyProperties from "@/components/MyProperties";
import { useTitleTokens } from "@/store/useTitleTokens";
import { useGovernors } from "@/store/useGovernors";
import { ProposalState } from "@/utils/types";
import { useRecentActivities } from "@/store/useRecentActivities";
import { IRecentActivities } from "db/interfaces/IRecentActivities";
import shallow from "zustand/shallow";

const LoadingIcon = () => <CircularProgress isIndeterminate size="1.3em" color='brand.java'/>
const LoadingCaret = () => <CircularProgress isIndeterminate size="1em" marginRight=".5em" color='brand.java'/>
const MissingCaret = () => <SmallCloseIcon marginRight=".5em" color="brand.coralRed" />

type LikeURLCreator = (itemId:string, jurisdiction:string) => string
type DefaultLikesCreator = (count:number) => Promise<LikeAction[]>
const TokenURLCreator:LikeURLCreator = (titleId:string, jurisdiction:string) => `/jurisdiction/${jurisdiction}/token/${titleId}/` // should be ${jurisdiction} but component not finished
const ProposalURLCreator:LikeURLCreator = (proposalId:string, jurisdiction:string) => `/jurisdiction/${jurisdiction}/proposal/${proposalId}`

type Sortable = { createdAt?:Date }
const sortDescending = (a:Sortable,b:Sortable) => {
  return (b.createdAt?.getTime()||0) - (a.createdAt?.getTime()||0)
}

const Home: NextPage = () => {
  const { isMemberPersona: isMember } = usePersona()
  const { active, library: web3Provider } = useWeb3React();
  //To-do: Get Recent Activity Filtered from custom hook useJSCTitleToken
  const { loaded: likesReady, likedProposals, likedTokens } = useLikes()
  const { isOpen: isOpenConfirmDeleteJurisdiction, onOpen: onOpenConfirmDeleteJurisdiction, onClose: onCloseConfirmDeleteJurisdiction } = useDisclosure()
  const cancelDeleteJurisdictionRef = React.useRef<HTMLButtonElement|null>(null)
  const [deletingJurisdictionName, setDeletingJurisdictionName] = React.useState("")
  const [deletingJurisdictionAddress, setDeletingJurisdictionAddress] = React.useState("")

  const isTokensInitialized = useTitleTokens(state => state.isInitialized)
  const getTokensContractDetails = useTitleTokens(state => state.get)
  const [ sampleTokenLikes, setSampleTokenLikes ] = React.useState<LikeAction[]|undefined>()

  const loadGovernorDetails = useGovernors(state => state.get)
  const [ sampleProposalLikes, setSampleProposalLikes ] = React.useState<LikeAction[]|undefined>()
  
  const jurisdictionsLoaded = useJurisdictions(state => state.loaded)
  const jurisdictionInfos = useJurisdictions(state => state.infos)
  const confirmJurisdictionsExist = useJurisdictions(state => state.confirm)
  const removeJurisdiction = useJurisdictions(state => state.remove)

  const { loadRecentActivities, isInitialized } = useRecentActivities(state => ({ loadRecentActivities: state.loadPage, isInitialized: state.isInitialized }), shallow )
  const recentActivitiesLoading = useRecentActivities(state => state.loadingPages[0])
  const recentActivities = useRecentActivities(state => state.pages[0])

  const sortedJurisdictions:JurisdictionInfo[] = useMemo(() => 
    Object.values(jurisdictionInfos).sort(sortDescending), [jurisdictionInfos])

  const confirmRemoveJurisdiction = useCallback((address:string, name:string) => {
    setDeletingJurisdictionName(name)
    setDeletingJurisdictionAddress(address)
    onOpenConfirmDeleteJurisdiction()
  }, [removeJurisdiction, setDeletingJurisdictionName, onOpenConfirmDeleteJurisdiction])

  const onConfirmRemoveJurisdiction = useCallback((address:string) => {
    onCloseConfirmDeleteJurisdiction()
    removeJurisdiction(address)
  }, [removeJurisdiction, onCloseConfirmDeleteJurisdiction])

  useEffect(() => {
    confirmJurisdictionsExist(web3Provider)
  }, [web3Provider, jurisdictionInfos])

  useEffect(() => {
    if (recentActivities === undefined && !recentActivitiesLoading && isInitialized())
      loadRecentActivities(0)
  }, [recentActivities, recentActivitiesLoading, loadRecentActivities, isInitialized()])

  useEffect(() => {
    if (isTokensInitialized() && sortedJurisdictions.length > 0) {
      const getSampleTokenLikes = async () => {
        const likes:LikeAction[] = []
        let attempts = 0
        while (attempts++ < 5) {
          const ji = Math.random() * sortedJurisdictions.length
          const jurisdictionInfo = sortedJurisdictions[Math.floor(ji)]
          const tokenContractInfo = await getTokensContractDetails(jurisdictionInfo.address, web3Provider)
          if (tokenContractInfo.tokenCount > 0) {
            const ti = Math.random() * tokenContractInfo.tokenCount
            const tokenId = await tokenContractInfo.instance.tokenAtIndex(Math.floor(ti))
            const token = await tokenContractInfo.loadToken(tokenId.toHexString())
            if (token) 
              likes.push({ 
                jurisdiction: jurisdictionInfo.address.toLowerCase(), 
                itemId: token.titleId, 
                name: token.titleId 
              })
            }
        } 
        setSampleTokenLikes(likes)
      }
      getSampleTokenLikes()
    }
  }, [isTokensInitialized(), sortedJurisdictions, web3Provider])

  useEffect(() => {
    if (sortedJurisdictions.length > 0) {
      const getSampleProposalLikes = async () => {
        const likes:LikeAction[] = []
        let attempts = 0
        while (attempts++ < 5) {
          const ji = Math.random() * sortedJurisdictions.length
          const jurisdictionInfo = sortedJurisdictions[Math.floor(ji)]
          const governorContractInfo = await loadGovernorDetails(jurisdictionInfo.address, web3Provider)
          const proposalData = await governorContractInfo.loadAllProposals()
          if (proposalData && proposalData.proposalIds && proposalData.proposals) {
            const proposals = Object.values(proposalData.proposals).filter(p => p.status !== ProposalState.Expired)
            if (proposals.length > 0) {
              const pi = Math.random() * proposals.length
              const proposalIndex = Math.floor(pi)
              const proposal = proposals[proposalIndex]
              await proposal.loadDetails()
              if (proposal.description) 
                likes.push({ 
                  jurisdiction: jurisdictionInfo.address.toLowerCase(), 
                  itemId: proposal.id, 
                  name: proposal.description 
                })
              }
            }
        } 
        setSampleProposalLikes(likes)
      }
      getSampleProposalLikes()
    }
  }, [isTokensInitialized(), sortedJurisdictions, web3Provider])

  const getJurisdictionTag = useCallback((jurisdiction:JurisdictionInfo) => {
    const jurisdictionAddress = jurisdiction.address.toLowerCase()
    let url = isMember() 
      ? `/jurisdiction/${jurisdictionAddress}`
      : `/jurisdiction/${jurisdictionAddress}/properties`
    if (jurisdiction.status === JurisdictionStatus.Exists)
      return (
        <Link href={url} variant={'13/16'} key={jurisdictionAddress}>
          <Tag key={jurisdictionAddress}>
            <Text>{jurisdiction.name} v{jurisdiction.version}</Text>
          </Tag>
        </Link>)
    if (jurisdiction.status === JurisdictionStatus.NotFound)
      return (
        <Link key={jurisdictionAddress} variant={'13/16'} onClick={async () => confirmRemoveJurisdiction(jurisdictionAddress, `${jurisdiction.name} v${jurisdiction.version}`)}>
          <Tag caret={<MissingCaret/>}>
            <Text>{jurisdiction.name} v{jurisdiction.version}</Text>
          </Tag>
        </Link>)
    return (
      <Tag key={jurisdictionAddress} caret={<LoadingCaret/>}>
        <Text>{jurisdiction.name} v{jurisdiction.version}</Text>
      </Tag>)
  }, [])
  
  const getFavourites = useCallback((jurisdictionMap:JurisdictionMap, getURL:LikeURLCreator, defaultItems:LikeAction[]|undefined) => {
    if (!likesReady)
      return <Tag justify='center'><LoadingIcon/></Tag>

    const getTag = (id:string, name:string, jurisdiction:string) => (
      <Link href={getURL(id, jurisdiction)} variant={'13/16'} key={jurisdiction+id}>
        <Tag style={{ whiteSpace: "nowrap" }}>
          <Text width="90%" overflow="hidden">{name}</Text>
        </Tag>
      </Link>)

    const items:JSX.Element[] = []
    const keys:{[key:string]: boolean} = {}
    const displayLikedItems: ILike[] = []
    const likedJurisdictions = Object.keys(jurisdictionMap)

    // Get all likes for all jurisdictions
    likedJurisdictions.forEach(jId => {
      const likedItemIds = Object.keys(jurisdictionMap[jId])
      likedItemIds.forEach(iId => displayLikedItems.push(jurisdictionMap[jId][iId]))
    })

    // Sort by createdAt date
    displayLikedItems.sort(sortDescending)
    displayLikedItems.forEach(like => {
      if (!keys[like.jurisdiction+like.itemId]) {
        items.push(getTag(like.itemId, like.name, like.jurisdiction))
        keys[like.jurisdiction+like.itemId] = true
      }
    })

    // If none, then show some "interesting" ones
    if (items.length < 3) {
      if (defaultItems && defaultItems.length > 0) {
        if (items.length === 0)
          items.push(<Text variant={'13/16'} key="99" mb="1rem">You have no favorites. Try some of these...</Text>)
        else
          items.push(<Text variant={'13/16'} key="99" mb="1rem">You can also try these...</Text>)
        defaultItems.slice(0, 4 - items.length).forEach(l => {
          if (!keys[l.jurisdiction+l.itemId]) {
            items.push(getTag(l.itemId, l.name, l.jurisdiction))
            keys[l.jurisdiction+l.itemId] = true
          }
        })
      }
      else if (defaultItems === undefined)
        items.push(<Tag justify='center' key="199"><LoadingIcon/></Tag>)
      else
        items.push(<Text variant={'13/16'} key="199">No data found</Text>)
    }

    return items
  }, [likesReady])

  return (
    <Box width='100%'>
      <Head><title>{homeLabels.pageTitle}</title></Head>
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
            <HStack width="100%" marginBottom='20px' >
              <Text flexGrow="1" variant={'15/20-BOLD'}>Recent Activity</Text>
              <Link href={"/recent-activity"}>
                <Text variant={'15/20-BOLD'} >
                 View all <ChevronRightIcon h={6} w={6}/>
                </Text>
              </Link>
            </HStack>
            <RecentActivity activities={recentActivities?.slice(0,3)} />
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
                  {isMember() 
                    ? <>
                        <Text variant={'15/20-BOLD'} margin='0 0 20px 0'>Favorite proposals</Text>
                        {getFavourites(likedProposals, ProposalURLCreator, sampleProposalLikes)}
                      </>
                    : <>
                        <Link href="/my-properties"><Text variant={'15/20-BOLD'} margin='0 0 20px 0'>My properties</Text></Link>
                        <MyProperties hidePrice={true} maxItems={5}/>
                      </>
                  }
              </Box>
              <Box
                width={'100%'}
                maxWidth={{ base: '100%', sm: '100%', md: '100%', lg: '330px' }}>
                <Text variant={'15/20-BOLD'} margin='0 0 20px 0'>Favorite properties</Text>
                {getFavourites(likedTokens, TokenURLCreator, sampleTokenLikes)}
              </Box>
            </Flex>
          </VStack>
        }
      </></Flex>

      <AlertDialog
        isOpen={isOpenConfirmDeleteJurisdiction}
        leastDestructiveRef={cancelDeleteJurisdictionRef}
        onClose={onCloseConfirmDeleteJurisdiction}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Jurisdiction
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text marginBottom="1em">
                There is no Jurisdiction responding at the given address on the current blockchain. There are multiple possible reasons for this: 
              </Text>
              <UnorderedList marginBottom="1em">
                <ListItem>This may be a temporary communication issue and you can try again later</ListItem>
                <ListItem>You are connected to a development blockchain and the jurisdiction was removed</ListItem>
                <ListItem>The given Jurisdiction has not yet been confirmed. Please try again later</ListItem>
              </UnorderedList>
              <Text marginBottom="1em">
                Do you want to delete the Jurisdiction called "{deletingJurisdictionName}" at address {deletingJurisdictionAddress} from your list of saved Jurisdictions?
              </Text>
              <Text marginBottom="1em">
                Note: This will NOT remove the Jurisdiciton from the blockchain if it exists.
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelDeleteJurisdictionRef} onClick={onCloseConfirmDeleteJurisdiction}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={() => onConfirmRemoveJurisdiction(deletingJurisdictionAddress)} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  )
}
export default Home
