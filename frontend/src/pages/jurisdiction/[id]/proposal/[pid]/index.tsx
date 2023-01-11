import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Button, CircularProgress, Divider, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import FavoriteProposalButton from '@/components/FavoriteProposalButton';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useWeb3React } from '@web3-react/core';
import { useJurisdictions } from '@/store/useJurisdictions';
import { useEffect, useState } from 'react';
import { useGovernors } from '@/store/useGovernors';
import { Link } from '@/components/Link';
import Tag from '@/components/Tag';

// convert milliseconds to days, hours, minutes, seconds
const msToTime = (duration:number) => {
  var minutes = parseInt(((duration/(1000*60))%60).toString(), 10)
  var hours = parseInt(((duration/(
    1000*60*60))%24).toString(), 10)
  var days = parseInt((duration/(1000*60*60*24)).toString(), 10)
  const time =
    (days>0 ? days + " days " : "" ) +
    (days+hours>0 ? hours + " hours " : "" ) +
    (minutes>0 ? minutes + " minutes" : "" )
  
  return time.length==0 ? "" : "("+ time + ")"
}

const twodigits = (n:number) => n < 10 ? "0"+n : n

/** calculate date and time the given blocknumber is estimated to arrive */
const blocksToDate = (blocks:number):string => {
  const secondsPerBlock = 12
  const totalSeconds = secondsPerBlock * blocks
  // add totalSeconds to current date
  const d = new Date()
  d.setSeconds(totalSeconds)
  
  return `${d.getFullYear()}-${twodigits(d.getMonth()+1)}-${twodigits(d.getDate())} ${twodigits(d.getHours())}:${twodigits(d.getMinutes())} ${msToTime(d.getTime()-Date.now())}`
}

const LoadingIcon = () => <CircularProgress isIndeterminate size="1.3em" color='brand.java'/>

const Proposal: NextPage = () => {
  const router = useRouter();
  const { library } = useWeb3React();

  // First load jurisdiction, then contracts, then Governor, then proposal...
  // If this page was saved as a bookmark, then none of the above may be loaded yet.

  const [ blockNumber, setBlockNumber ] = useState(0)
  const jurisdictionAddress = router.query.id as string;
  const proposalId = router.query.pid as string;
  const { loaded:jurisdictionsLoaded, loadContracts } = useJurisdictions();
  
  const jurisdictionName = useJurisdictions(state => state.infos[jurisdictionAddress]?.name)
  const jscGovernorAddress = useJurisdictions(state => state.contracts[jurisdictionAddress]?.byName['jsc.contracts.governor']?.address)
  const loadGovernorDetails = useGovernors(state => state.get)
  const jscGovernorDetails = useGovernors(state => state.governors[jscGovernorAddress])
  const proposal = jscGovernorDetails?.proposals && jscGovernorDetails?.proposals[proposalId]

  // Determine current block number
  useEffect(() => { 
    const getBlockNumber = async () => { setBlockNumber(library ? await library.getBlockNumber() : 0) }
    getBlockNumber()
  }, [library])

  // Load contracts from jurisdiciton
  useEffect(() => { jurisdictionsLoaded && loadContracts(jurisdictionAddress, library) },
    [jurisdictionAddress, jurisdictionsLoaded, library]);

  // Load governor details
  useEffect(() => { jscGovernorAddress && !jscGovernorDetails && loadGovernorDetails(jscGovernorAddress, library) }, 
    [jscGovernorAddress, jscGovernorDetails, library]);

  // Load proposal
  useEffect(() => { jscGovernorDetails && jscGovernorDetails.loadProposal(proposalId) }, [jscGovernorDetails, proposalId]);

  // Load proposal details
  useEffect(() => { proposal && proposal.loadDetails() }, [proposal]);

  return (
    <Box width="100%">
      <Head>
        <title>Proposal</title>
      </Head>
      <Link onClick={() => router.back()} display="flex" fontWeight="bold">
        <ArrowBackIcon marginRight="10px" marginTop="5px" />
        <Text>Back to Dashboard / Jurisdiction</Text>
      </Link>
      <Heading whiteSpace="pre-line" variant={'80'} my={4} marginBottom="48px">
        Proposal{' '}
        <FavoriteProposalButton
          jurisdiction={jurisdictionAddress}
          itemId={proposalId as string}
          name={proposal?.description || proposal?.id || ''}
        />
      </Heading>
      <Box>
        <VStack width="100%" alignItems="flex-start">
          <HStack alignItems="flex-start" width="100%">
            <Text width="20%">Jurisdiction:</Text>
            <Text>{jurisdictionName}</Text>
          </HStack>
          <HStack alignItems="flex-start" width="100%">
            <Text width="20%">Expiry date:</Text>
            <Text>
              {proposal?.deadline && blockNumber
                ? blocksToDate((proposal?.deadline || 0) - blockNumber)
                : ''}
            </Text>
          </HStack>
          <HStack
            alignItems="flex-start"
            width="100%"
            style={{ marginBottom: '20px' }}
          >
            <Text width="20%">Description:</Text>
            <Text>{proposal?.description || proposal?.id || ''}</Text>
          </HStack>
          <Divider />
          <HStack alignItems="flex-start" width="100%" paddingBottom="20px">
            <Text width="20%">Revisions:</Text>
            <VStack alignItems="flex-start" width="80%">
              {proposal?.revisions ? (
                proposal?.revisions.map(r => (
                  <Link
                    href={`/jurisdiction/${jurisdictionAddress}/proposal/${proposalId}/revision/${r.id}`}
                    variant={'15/20'}
                    key={r.id}
                    width="100%"
                  >
                    <Tag>
                      <Text>{r.name}</Text>
                    </Tag>
                  </Link>
                ))
              ) : (
                <Tag>
                  <LoadingIcon />
                </Tag>
              )}
              <Divider />
            </VStack>
          </HStack>
          <Divider />
          <HStack width="100%" paddingTop="20px" alignItems="flex-start">
            <HStack gap="20px" width="80%">
              <VStack>
                <Button variant="Header">Vote YES</Button>
                <Text>1 Votes</Text>
              </VStack>
              <VStack>
                <Button variant="Header">Vote NO</Button>
                <Text>2 Votes</Text>
              </VStack>
              <VStack>
                <Button variant="Header">Abstain</Button>
                <Text>3 Votes</Text>
              </VStack>
            </HStack>
            <HStack flexDirection="row-reverse" width="20%">
              <Button variant="Header">Execute</Button>
            </HStack>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default Proposal;
