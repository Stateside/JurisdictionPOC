import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, CircularProgress, Divider, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useJurisdictions } from '@/store/useJurisdictions';
import { useGovernors } from '@/store/useGovernors';
import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useParameterSimplifier } from '@/store/useParameterSimplifier';

const LoadingIcon = () => <CircularProgress isIndeterminate size="1em" color='brand.java'/>

const Revision: NextPage = () => {
  const router = useRouter();
  const { library } = useWeb3React();

  // First load jurisdiction, then Governor, then proposal, then revision...
  // If this page was saved as a bookmark, then none of the above may be loaded yet.

  const jurisdictionAddress = router.query.id as string;
  const proposalId = router.query.pid as string;
  const revisionId = router.query.rid as string;
  const { loaded:jurisdictionsLoaded, loadContracts } = useJurisdictions();
  
  const jurisdictionName = useJurisdictions(state => state.infos[jurisdictionAddress]?.name)
  const jscGovernorAddress = useJurisdictions(state => state.contracts[jurisdictionAddress]?.byName['jsc.contracts.governor']?.address)
  const loadGovernorDetails = useGovernors(state => state.get)
  const jscGovernorDetails = useGovernors(state => state.governors[jscGovernorAddress])
  const proposal = jscGovernorDetails?.proposals && jscGovernorDetails?.proposals[proposalId]
  const revision = proposal?.revisions?.find(revision => revision.id.toString() === revisionId)
  const unknownRevision = proposal?.revisions && !revision

  const { simplifyDescription, simplifyValue } = useParameterSimplifier()

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
      <Heading whiteSpace="pre-line" my={4} marginBottom="48px">
        Revision
      </Heading>
      <Box>
        <VStack width="100%" alignItems="flex-start">
          <HStack alignItems="flex-start" width="100%">
            <Text width="20%">Jurisdiction:</Text>
            <Text>{jurisdictionName||<LoadingIcon/>}</Text>
          </HStack>
          <Divider paddingTop="20px" paddingBottom="20px" />
          <HStack alignItems="flex-start" width="100%">
            <Text width="20%">Proposal:</Text>
            <Text>{proposal?.description||<LoadingIcon/>}</Text>
          </HStack>
          <Divider paddingTop="20px" paddingBottom="20px" />
          <HStack alignItems="flex-start" width="100%">
            <Text width="20%">Revision:</Text>
            <Text>{unknownRevision?"Not Found":revision?.name||<LoadingIcon/>}</Text>
          </HStack>
          <Divider paddingTop="20px" paddingBottom="20px" />
          <HStack alignItems="flex-start" width="100%">
            <Text width="20%">Description:</Text>
            <Text>{unknownRevision?"Not Found":simplifyDescription(revision)||<LoadingIcon/>}</Text>
          </HStack>
          <Divider paddingTop="20px" paddingBottom="20px" />
          <HStack alignItems="flex-start" width="100%">
            <Text width="20%">Parameters:</Text>
            <VStack alignItems="flex-start" width="25%">
              <Text>Name</Text>
              {
                unknownRevision ? <Text>Not Found</Text> :
                revision 
                  ? revision.parameters?.map(parameter => (
                      <Text key={parameter.name}>{parameter.name}</Text>
                    ))
                  : <LoadingIcon/>
              }
            </VStack>
            <VStack alignItems="flex-start" width="25%">
              <Text>Description</Text>
              {
                unknownRevision ? <Text>Not Found</Text> :
                revision 
                  ? revision.parameters?.map(parameter => (
                      <Text key={parameter.name}>{parameter.hint}</Text>
                    ))
                  : <LoadingIcon/>
              }
            </VStack>
            <VStack alignItems="flex-start" width="25%">
              <Text>Value</Text>
              {
                unknownRevision ? <Text>Not Found</Text> :
                revision 
                  ? revision.parameters?.map(parameter => (
                      <Text key={parameter.name}>{simplifyValue(parameter)}</Text>
                    ))
                  : <LoadingIcon/>
              }
            </VStack>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default Revision;
