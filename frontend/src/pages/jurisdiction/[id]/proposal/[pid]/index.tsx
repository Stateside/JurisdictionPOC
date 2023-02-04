import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Button, CircularProgress, Divider, Heading, HStack, Text, useToast, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import FavoriteProposalButton from '@/components/FavoriteProposalButton';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useWeb3React } from '@web3-react/core';
import { useJurisdictions } from '@/store/useJurisdictions';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IProposalDetails, IRevisionDetails, useGovernors } from '@/store/useGovernors';
import { Link } from '@/components/Link';
import Tag from '@/components/Tag';
import RevisionModal from './RevisionModal';
import { ProposalState, VoteType } from '@/utils/types';
import MemberOnlyButton from '@/components/MemberOnlyButton';
import { ethers } from 'ethers';

// convert milliseconds to days, hours, minutes, seconds
const msToTime = (duration:number, blocks:number) => {
  if (duration <= 0) 
    return "(Voting has ended)"
    
  var minutes = parseInt(((duration/(1000*60))%60).toString(), 10)
  var hours = parseInt(((duration/(
    1000*60*60))%24).toString(), 10)
  var days = parseInt((duration/(1000*60*60*24)).toString(), 10)
  const time =
    (days>0 ? days + " days " : "" ) +
    (days+hours>0 ? hours + " hours " : "" ) +
    (minutes>0 ? minutes + " minutes" : "" )
  
  return `(${time.length==0 ? "less than one minute" : time} / ${blocks} blocks)`
}

const twodigits = (n:number) => n < 10 ? "0"+n : n

/** calculate date and time the given blocknumber is estimated to arrive */
const blocksToDate = (blocks:number):string => {
  const secondsPerBlock = 12
  const totalSeconds = secondsPerBlock * blocks
  // add totalSeconds to current date
  const d = new Date()
  d.setSeconds(totalSeconds)
  
  return `${d.getFullYear()}-${twodigits(d.getMonth()+1)}-${twodigits(d.getDate())} ${twodigits(d.getHours())}:${twodigits(d.getMinutes())} ${msToTime(d.getTime()-Date.now(), blocks)}`
}

const LoadingIcon = () => <CircularProgress isIndeterminate size="1.3em" color='brand.java'/>

const Proposal: NextPage = () => {
  const router = useRouter();
  const { account, library } = useWeb3React();
  const toast = useToast()

  // First load jurisdiction, then contracts, then Governor, then proposal...
  // If this page was saved as a bookmark, then none of the above may be loaded yet.

  const [ blockNumber, setBlockNumber ] = useState(0)
  const [openRevisionModal, setOpenRevisionModal] = useState(false);
  const [selectedRevision, setSelectedRevision] = useState<IRevisionDetails|undefined>()
  const jurisdictionAddress = (router.query.id as string)?.toLowerCase();
  const proposalId = (router.query.pid as string).toLowerCase();
  const { loaded:jurisdictionsLoaded, loadContracts } = useJurisdictions();
  
  const jurisdictionName = useJurisdictions(state => state.infos[jurisdictionAddress]?.name)
  const jscGovernorAddress = useJurisdictions(state => state.contracts[jurisdictionAddress]?.byName['jsc.contracts.governor']?.address)
  const loadGovernorDetails = useGovernors(state => state.get)
  const jscGovernorDetails = useGovernors(state => state.governors[jscGovernorAddress])
  const proposal = useGovernors(state => state.governors[jscGovernorAddress]?.proposals?.[proposalId])

  const [hasVoted, setHasVoted] = useState(true)

  const onBlockEvent = useCallback((b:any) => {
    console.log("block event", b)
    const getBlockNumber = async () => { setBlockNumber(library ? await library.getBlockNumber() : 0) }
    getBlockNumber()
  }, [library])

  useEffect(() => {
    library?.on("block", onBlockEvent)
    return () => { library?.removeListener("block", onBlockEvent) }
  }, [onBlockEvent])

  useEffect(() => {
    if (account && proposal) {
      proposal.hasVoted(account).then(v => v!==undefined && setHasVoted(v))
    }
  }, [account, proposal])

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
  useEffect(() => { jscGovernorDetails && jscGovernorDetails.loadProposal(proposalId) }, 
    [jscGovernorDetails, proposalId]);

  // Load proposal details
  useEffect(() => { proposal && proposal.loadDetails() }, [proposal]);

  const canVote = useMemo(() => {
    return proposal?.status === ProposalState.Active && !hasVoted
  }, [proposal?.status, hasVoted])

  const canExecute = useMemo(() => {
    return proposal?.status === ProposalState.Succeeded
  }, [proposal?.status])

  let voteToolTip = undefined
  if (hasVoted) 
    voteToolTip = 'You have already voted on this proposal'
  if (proposal?.status !== ProposalState.Active) 
    voteToolTip = 'Voting is not currently open for this proposal'

  let executeTooltip = undefined
  switch(proposal?.status) {
    case ProposalState.Defeated:
      executeTooltip = 'This proposal was defeated'
      break
    case ProposalState.Executed:
      executeTooltip = 'This proposal was already executed'
      break
    case ProposalState.Expired:
      executeTooltip = 'This proposal has expired'
      break
    case ProposalState.Active:
      executeTooltip = 'This proposal is still active'
      break
    case ProposalState.Canceled:
      executeTooltip = 'This proposal was cancelled'
      break
  }

  const vote = async (vote:VoteType) => {
    if (jscGovernorDetails) {
      await jscGovernorDetails.instanceWithSigner(library.getSigner()).castVote(proposalId, vote)
      toast({
        title: 'Vote Submitted',
        description: "Your vote has been submitted to the blockchain. It may take a few minutes to be confirmed.",
        status: 'success',
        duration: 3000
      })
    }
  }

  const execute = async (proposal:IProposalDetails|undefined) => {
    if (jscGovernorDetails && proposal && proposal.revisions && proposal.revisions.length > 0 && proposal.version && proposal.description) {
      await jscGovernorDetails.instanceWithSigner(library.getSigner()).execute(
        proposal.revisions?.map(r => ({
          target: r.target,
          name: r.name,
          pdata: r.pdata,
        })),
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes(proposal.description)),
        proposal.version)
      toast({
        title: 'Proposal Executed',
        description: "Your execution of this proposal has been submitted to the blockchain. It may take a few minutes to be confirmed.",
        status: 'success',
        duration: 8000
      })
    }
  }

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
          >
            <Text width="20%">Description:</Text>
            <Text>{proposal?.description || proposal?.id || ''}</Text>
          </HStack>
          <HStack alignItems="flex-start" width="100%" style={{ marginBottom: '20px' }}>
            <Text width="20%">Status:</Text>
            <Text>{proposal ? ProposalState[proposal?.status||0] : ""}</Text>
          </HStack>
          <Divider />
          <HStack
            alignItems="flex-start"
            width="100%"
            paddingBottom="20px"
            paddingTop="20px"
          >
            <Text width="20%">Revisions:</Text>
            <VStack alignItems="flex-start" width="80%">
              {proposal?.revisions ? (
                proposal?.revisions.map(r => (
                  <Link
                    onClick={() => {setSelectedRevision(r); setOpenRevisionModal(true)}}
                    variant={'15/20'}
                    key={r.id}
                    width="100%"
                    style={{paddingBottom: "20px"}}
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
            </VStack>
          </HStack>
          <Divider />
          <HStack width="100%" paddingTop="20px" alignItems="flex-start">
            <HStack gap="20px" width="80%">
              <VStack>
                <MemberOnlyButton variant="Header" disabled={!canVote} tooltip={voteToolTip} onClick={() => vote(VoteType.For)}>Vote For</MemberOnlyButton>
                <Text>{(proposal?.votes?.forVotes || 0) + " Votes"}</Text>
              </VStack>
              <VStack>
                <MemberOnlyButton variant="Header" disabled={!canVote} tooltip={voteToolTip} onClick={() => vote(VoteType.Against)}>Vote Against</MemberOnlyButton>
                <Text>{(proposal?.votes?.againstVotes || 0) + " Votes"}</Text>
              </VStack>
              <VStack>
                <MemberOnlyButton variant="Header" disabled={!canVote} tooltip={voteToolTip} onClick={() => vote(VoteType.Abstain)}>Abstain</MemberOnlyButton>
                <Text>{(proposal?.votes?.abstainVotes || 0) + " Votes"}</Text>
              </VStack>
            </HStack>
            <HStack flexDirection="row-reverse" width="20%">
              <MemberOnlyButton variant="Header" disabled={!canExecute} tooltip={executeTooltip} onClick={() => execute(proposal)}>Execute</MemberOnlyButton>
            </HStack>
          </HStack>
        </VStack>
      </Box>
      <RevisionModal
        jurisdictionName={jurisdictionName}
        revision={selectedRevision as any}
        unknownRevision={!proposal?.detailsLoading && proposal?.revisions?.length === 0}
        isOpen={openRevisionModal}
        onClose={() => setOpenRevisionModal(false)}
      />
    </Box>
  );
};

export default Proposal;
