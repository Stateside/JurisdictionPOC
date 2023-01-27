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
  Heading,
  Switch,
} from '@chakra-ui/react';
import { useJurisdictions } from '@/store/useJurisdictions';
import { IRevisionDetails, useGovernors } from '@/store/useGovernors';
import { useCallback, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useParameterSimplifier } from '@/store/useParameterSimplifier';
import { capitalizeString } from '@/utils/util';
import { IRevisionParameter, ParamType } from 'db/interfaces/IRevisionParameter';
import { useAliases } from '@/store/useAliases';
import { ParameterDetails } from '../ParameterDetails';

const LoadingIcon = () => (
  <CircularProgress isIndeterminate size="1em" color="brand.java" />
);

const RevisionModal = ({
  jurisdictionName,
  revision,
  unknownRevision,
  isOpen,
  onClose
}: {
  jurisdictionName: string
  revision: IRevisionDetails
  unknownRevision: boolean
  isOpen: boolean
  onClose: any
}) => {
  const { simplifyDescription } = useParameterSimplifier();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
      <ModalOverlay />
      <ModalContent p="10px">
        <ModalHeader>
          <Heading variant="60">
            {unknownRevision ? 'Not Found' : revision?.name || <LoadingIcon />}
          </Heading>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Divider />
          <Box marginBottom="1em">
            <VStack width="100%" alignItems="flex-start">
              <HStack alignItems="flex-start" width="100%" p="1rem 0rem">
                <Text width="10%">Jurisdiction:</Text>
                <Text>{jurisdictionName || <LoadingIcon />}</Text>
              </HStack>
              <Divider />
              <HStack alignItems="flex-start" width="100%" p="1rem 0rem">
                <Text width="10%">Description:</Text>
                <Text>
                  {unknownRevision
                    ? 'Not Found'
                    : simplifyDescription(revision) || <LoadingIcon />}
                </Text>
              </HStack>
              <Divider />
              {/*Parameters*/}
              <HStack width="100%" alignItems={'flex-start'} p="1rem 0rem">
                <Text width="10%">Parameters</Text>
                <VStack width="90%">
                  {unknownRevision ? (
                    <Text>Not Found</Text>
                  ) : revision ? (
                    revision.parameters?.map(parameter => (
                      <VStack
                        key={parameter.name}
                        width="100%"
                        alignItems={'flex-start'}
                      >
                        <HStack width="100%" mb="30px">
                          <Text width="20%">
                            {capitalizeString(parameter.name)}:
                          </Text>
                          <ParameterDetails param={parameter} width="80%" />
                        </HStack>
                      </VStack>
                    ))
                  ) : (
                    <LoadingIcon />
                  )}
                </VStack>
              </HStack>
              <Divider />
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RevisionModal;
