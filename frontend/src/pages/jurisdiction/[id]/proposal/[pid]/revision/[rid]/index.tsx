import type { NextPage } from 'next';
import Head from 'next/head';
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import FavoriteProposalButton from '@/components/FavoriteProposalButton';

const Revision: NextPage = () => {
  const router = useRouter();
  const { id: jurisdiction, pid: proposalId } = router.query;

  return (
    <Box width="100%">
      <Head>
        <title>Proposal</title>
      </Head>
      <Heading whiteSpace="pre-line" my={4} marginBottom="48px">
        Revision
        <FavoriteProposalButton
          jurisdiction={jurisdiction as string}
          itemId={proposalId as string}
          name="Proposal"
        />
      </Heading>
      <Box>
        <VStack width="100%" alignItems="flex-start">
          <HStack alignItems="flex-start" width="100%">
            <Text width="20%">Jurisdiction:</Text>
            <Text>Costa Rica</Text>
          </HStack>
          <Divider paddingTop="20px" paddingBottom="20px" />
          <HStack alignItems="flex-start" width="100%">
            <Text width="20%">Description:</Text>
            <Text>Proposal description</Text>
          </HStack>
          <Divider paddingTop="20px" paddingBottom="20px" />
          <HStack alignItems="flex-start" width="100%">
            <Text width="20%">Parameters:</Text>
            <VStack alignItems="flex-start" width="25%">
              <Text>Name:</Text>
              <Text>Public Key</Text>
            </VStack>
            <VStack alignItems="flex-start" width="25%">
              <Text>Description:</Text>
              <Text>Revision's description</Text>
            </VStack>
            <VStack alignItems="flex-start" width="25%">
              <Text>Value:</Text>
              <Text>0x0123456789</Text>
            </VStack>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default Revision;
