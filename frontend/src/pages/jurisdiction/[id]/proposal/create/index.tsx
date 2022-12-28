import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Button, Divider, Heading, HStack, Input, Text, Textarea, VStack } from '@chakra-ui/react';
import Revision from './Revision';

const CreateProposal: NextPage = () => {
  return (
    <Box width="100%">
      <Head>
        <title>Create Proposal</title>
      </Head>
      <Heading whiteSpace="pre-line" my={4} marginBottom="48px">
        Create Proposal
      </Heading>
      <Box>
        <VStack width="100%" alignItems="flex-start">
          <HStack alignItems="flex-start" width="100%">
            <Text width="20%">Jurisdiction Name:</Text>
            <Text>Costa Rica</Text>
          </HStack>
          <Divider />
          <HStack alignItems="flex-start" width="100%">
            <Text width="20%">Proposal Name:</Text>
            <Input width="80%" />
          </HStack>
          <Divider />
          <HStack alignItems="flex-start" width="100%">
            <Text width="20%">Description:</Text>
            <Textarea width="80%" />
          </HStack>
          <Divider />
          <HStack alignItems="flex-start" width="100%">
            <Text width="20%">Revisions:</Text>
            <VStack alignItems="flex-start" width="80%">
              <Revision />
              <Revision />
              <Revision />
              <Button variant="Header">Add new revision</Button>
            </VStack>
          </HStack>
          <HStack flexDirection="row-reverse" width="100%">
            <Button variant="Header">Create Jurisdiction</Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default CreateProposal;
