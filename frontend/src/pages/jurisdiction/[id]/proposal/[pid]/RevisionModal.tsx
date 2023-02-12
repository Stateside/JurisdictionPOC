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
} from '@chakra-ui/react';
import { IRevisionDetails } from '@/store/useGovernors';
import { useParameterSimplifier } from '@/store/useParameterSimplifier';
import { capitalizeString } from '@/utils/util';
import ParameterDetails from '../ParameterDetails';

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
          <Box mb="3em" mt=".5rem">
            <VStack width="100%" alignItems="flex-start">
              <HStack alignItems="flex-start" width="100%" p="1rem 0rem">
                <Text width="15%">Jurisdiction name:</Text>
                <Text>{jurisdictionName || <LoadingIcon />}</Text>
              </HStack>
              <Divider />
              <HStack alignItems="flex-start" width="100%" p="1rem 0rem">
                <Text width="15%">Description:</Text>
                <Text>
                  {unknownRevision
                    ? 'Not Found'
                    : simplifyDescription(revision) || <LoadingIcon />}
                </Text>
              </HStack>
              <Divider />
              {/*Parameters*/}
              <HStack width="100%" alignItems={'flex-start'} p="1rem 0rem">
                <Text width="15%">Parameters</Text>
                <VStack width="85%">
                  {unknownRevision ? (
                    <Text>Not Found</Text>
                  ) : revision ? (
                    revision.parameters?.map(parameter => (
                      <VStack
                        key={parameter.name}
                        width="100%"
                        alignItems={'flex-start'}
                        mb=".8rem"
                      >
                        <HStack width="100%" mb="-.5rem">
                          <Text width="10%">
                            {capitalizeString(parameter.name)}:
                          </Text>
                          <ParameterDetails param={parameter} width="90%" />
                        </HStack>
                        <Text variant="break-word" width="30%" fontSize="sm" color="brand.grey.grey03">
                          {parameter.hint}
                        </Text>
                      </VStack>
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
