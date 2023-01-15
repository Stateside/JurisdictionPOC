import {
  Box,
  CircularProgress,
  Divider,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useJurisdictions } from '@/store/useJurisdictions';
import { useGovernors } from '@/store/useGovernors';
import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useParameterSimplifier } from '@/store/useParameterSimplifier';

const LoadingIcon = () => (
  <CircularProgress isIndeterminate size="1em" color="brand.java" />
);

const RevisionModal = ({
  isOpen,
  onClose,
  jurisdictionAddress,
  proposalId,
  revisionId
}: {
  jurisdictionAddress: string;
  proposalId: string;
  revisionId: number;
  isOpen: boolean;
  onClose: any;
}) => {
  const router = useRouter();
  const { library } = useWeb3React();

  // First load jurisdiction, then Governor, then proposal, then revision...
  // If this page was saved as a bookmark, then none of the above may be loaded yet.

  const { loaded: jurisdictionsLoaded, loadContracts } = useJurisdictions();

  const jurisdictionName = useJurisdictions(
    state => state.infos[jurisdictionAddress]?.name
  );
  const jscGovernorAddress = useJurisdictions(
    state =>
      state.contracts[jurisdictionAddress]?.byName['jsc.contracts.governor']
        ?.address
  );
  const loadGovernorDetails = useGovernors(state => state.get);
  const jscGovernorDetails = useGovernors(
    state => state.governors[jscGovernorAddress]
  );
  const proposal =
    jscGovernorDetails?.proposals && jscGovernorDetails?.proposals[proposalId];
  const revision = proposal?.revisions?.find(
    revision => revision.id === revisionId
  );
  const unknownRevision = proposal?.revisions && !revision;

  const { simplifyDescription, simplifyValue } = useParameterSimplifier();

  // Load contracts from jurisdiciton
  useEffect(() => {
    jurisdictionsLoaded && loadContracts(jurisdictionAddress, library);
  }, [jurisdictionAddress, jurisdictionsLoaded, library]);

  // Load governor details
  useEffect(() => {
    jscGovernorAddress &&
      !jscGovernorDetails &&
      loadGovernorDetails(jscGovernorAddress, library);
  }, [jscGovernorAddress, jscGovernorDetails, library]);

  // Load proposal
  useEffect(() => {
    jscGovernorDetails && jscGovernorDetails.loadProposal(proposalId);
  }, [jscGovernorDetails, proposalId]);

  // Load proposal details
  useEffect(() => {
    proposal && proposal.loadDetails();
  }, [proposal]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Revision</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box marginBottom="1em">
            <VStack width="100%" alignItems="flex-start">
              <HStack alignItems="flex-start" width="100%" p="1rem 0rem">
                <Text width="10%">Jurisdiction:</Text>
                <Text>{jurisdictionName || <LoadingIcon />}</Text>
              </HStack>
              <Divider/>
              <HStack alignItems="flex-start" width="100%" p="1rem 0rem">
                <Text width="10%">Proposal:</Text>
                <Text>{proposal?.description || <LoadingIcon />}</Text>
              </HStack>
              <Divider/>
              <HStack alignItems="flex-start" width="100%" p="1rem 0rem">
                <Text width="10%">Revision:</Text>
                <Text>
                  {unknownRevision
                    ? 'Not Found'
                    : revision?.name || <LoadingIcon />}
                </Text>
              </HStack>
              <Divider/>
              <HStack alignItems="flex-start" width="100%" p="1rem 0rem">
                <Text width="10%">Description:</Text>
                <Text>
                  {unknownRevision
                    ? 'Not Found'
                    : simplifyDescription(revision) || <LoadingIcon />}
                </Text>
              </HStack>
              <Divider/>
              <HStack width="100%" alignItems={'flex-start'} p="1rem 0rem">
                <Text width="10%">Parameters</Text>
                <VStack width="90%">
                  <HStack width="100%">
                    <Text width="20%">Name</Text>
                    <Text width="40%">Description</Text>
                    <Text width="40%">Value</Text>
                  </HStack>
                  <HStack width="100%" style={{marginTop: "1px"}}>
                    <Text width="20%"><Divider/></Text>
                    <Text width="40%"><Divider/></Text>
                    <Text width="40%"><Divider/></Text>
                  </HStack>
                  {unknownRevision ? (
                    <Text>Not Found</Text>
                  ) : revision ? (
                    revision.parameters?.map(parameter => (
                      <HStack key={parameter.name} width="100%" alignItems={'flex-start'}>
                        <Text width="20%">{parameter.name}</Text>
                        <Text width="40%" variant="break-word">{parameter.hint}</Text>
                        <Text width="40%" variant="break-word">{simplifyValue(parameter)}</Text>
                      </HStack>
                    ))
                  ) : (
                    <LoadingIcon />
                  )}
                </VStack>
              </HStack>
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RevisionModal;
