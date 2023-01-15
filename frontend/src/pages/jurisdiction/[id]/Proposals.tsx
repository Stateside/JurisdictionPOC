import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Box, Button, CircularProgress, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import Tag from '@/components/Tag';
import { useRouter } from 'next/router';
import { useJurisdictions } from '@/store/useJurisdictions';
import { IProposalDetails, useGovernors } from '@/store/useGovernors';
import { Link } from '@/components/Link';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { ProposalState } from '@/utils/types';

const LoadingIcon = () => <CircularProgress isIndeterminate size="1.3em" color='brand.java' />
const LoadingCaret = () => <CircularProgress isIndeterminate size="1em" marginRight=".5em" color='brand.java'/>

const Proposals = () => {
  const { library } = useWeb3React();
  const router = useRouter();

  // First load jurisdiction, then contracts, then Governor, then proposals...
  // If this page was saved as a bookmark, then none of the above may be loaded yet.

  const jurisdictionAddress = router.query.id as string;
  const { loaded:jurisdictionsLoaded, loadContracts } = useJurisdictions();

  const jscGovernorAddress = useJurisdictions(state => state.contracts[jurisdictionAddress]?.byName['jsc.contracts.governor']?.address)
  const loadGovernorDetails = useGovernors(state => state.get)
  const jscGovernorDetails = useGovernors(state => state.governors[jscGovernorAddress])
  const proposalIds = jscGovernorDetails?.proposalIds
  const proposals = jscGovernorDetails?.proposals

  // Load contracts from jurisdiciton
  useEffect(() => { jurisdictionsLoaded && loadContracts(jurisdictionAddress, library) },
    [jurisdictionAddress, jurisdictionsLoaded, library]);

  // Load governor details
  useEffect(() => { jscGovernorAddress && !jscGovernorDetails && loadGovernorDetails(jscGovernorAddress, library) }, 
    [jscGovernorAddress, jscGovernorDetails, library]);

  // Load governor proposals
  useEffect(() => {
    if (jscGovernorDetails && !jscGovernorDetails.proposalsLoading && !jscGovernorDetails.allProposalsLoaded) {
      jscGovernorDetails.loadAllProposals()
    }
  }, [jscGovernorDetails]);

  // Load proposal details for each proposal if not loaded or loading
  useEffect(() => {
    if (proposalIds?.length) {
      proposalIds.forEach(id => {
        const pd = proposals && proposals[id]
        if (pd && !pd.detailsLoading && !pd.revisions) {
          pd.loadDetails()
        }
      })
    }
  }, [proposalIds])

  const getTag = (id:string, name:string, status?:string) => (
    <Link href={jurisdictionAddress+"/proposal/"+id} variant={'15/20'} key={id}>
      <Tag information={status}>
        <Text>{name}</Text>
      </Tag>
    </Link>)
  
  const activeOrLoading = (p:IProposalDetails) => p.status===ProposalState.Active || p.status === undefined

  return (
    <>
      {proposals && proposalIds && proposalIds.length > 0 && (
        <VStack width="100%" mt="30px" alignItems="flex-start">
          <Box width="100%">
            <Text variant={'15/20-BOLD'} marginBottom="20px">
              Active proposals
            </Text>
            <Box>
              {proposalIds.filter(id => activeOrLoading(proposals[id])).map(id => {
                const p = proposals[id];
                if (jscGovernorDetails?.allProposalsLoaded && !p.description)
                  return getTag(id, `(${id})`);
                if (p.description) return getTag(id, p.description);
                return (
                  <Tag key={id} caret={<LoadingCaret />}>
                    <Text variant={'15/20'}>({id})</Text>
                  </Tag>
                );
              })}
            </Box>
          </Box>
          <Divider />
          <Box width="100%" pt="30px">
            <HStack width="100%">
              <Text flexGrow="1" variant={'15/20-BOLD'} marginBottom="20px">
                Closed proposals
              </Text>
              <Link>
                <Text variant={'15/20-BOLD'} marginBottom="20px">
                 View all <ChevronRightIcon h={6} w={6}/>
                </Text>
              </Link>
            </HStack>
            <Box>
              {proposalIds.filter(id => !activeOrLoading(proposals[id])).map(id => {
                const p = proposals[id];
                return p.description ? (
                  getTag(id, p.description, p.status!==undefined?ProposalState[p.status]:'checking...')
                ) : (
                  <Tag key={id} caret={<LoadingCaret />} information='checking...'>
                    <Text variant={'15/20'}>{id}</Text>
                  </Tag>
                );
              })}
            </Box>
          </Box>
        </VStack>
      )}
      {jscGovernorDetails?.proposalsLoading && <Tag justify="center" caret={null}><LoadingIcon /></Tag>}
      {!jscGovernorDetails?.proposalsLoading && (!proposalIds || proposalIds.length===0) && <Text>No proposals found</Text>}
      <Box>
        <Divider m="1rem 0rem"/>
        <Button variant="Header" onClick={() => router.push(`${jurisdictionAddress}/proposal/create`)}>Create New Proposal</Button>
      </Box>
    </>
  );
};

export default Proposals;
