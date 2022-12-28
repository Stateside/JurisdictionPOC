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

const Proposal: NextPage = () => {
  return (
    <Box width="100%">
      <Head>
        <title>Proposal</title>
      </Head>
      <Heading whiteSpace="pre-line" my={4} marginBottom="48px">
        Proposal
      </Heading>
      <Box>
        <VStack width="100%" alignItems="flex-start">
          <HStack alignItems="flex-start" width="100%">
            <Text width="20%">Jurisdiction:</Text>
            <Text>Costa Rica</Text>
          </HStack>
          <HStack alignItems="flex-start" width="100%">
            <Text width="20%">Expiry date:</Text>
            <Text>October 31st, 2022, 9: 00 AM</Text>
          </HStack>
          <HStack alignItems="flex-start" width="100%">
            <Text width="20%">Description:</Text>
            <Text>Proposal description</Text>
          </HStack>
          <Divider />
          <HStack alignItems="flex-start" width="100%" paddingBottom="20px">
            <Text width="20%">Revisions:</Text>
            <VStack alignItems="flex-start" width="80%">
              <Text>Revision 1</Text>
              <Divider />
              <Text>Revision 2</Text>
            </VStack>
          </HStack>
          <Divider />
          <HStack width="100%" paddingTop="20px">
            <HStack gap="20px" width="80%">
              <Button variant="Header">Vote YES</Button>
              <Button variant="Header">Vote NO</Button>
              <Button variant="Header">Abstain</Button>
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
