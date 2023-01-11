import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Button, Divider, Heading, HStack, Input, Text, Textarea, VStack } from '@chakra-ui/react';
import Revision from './Revision';
import AddRevisionModal from './AddRevisionModal';
import { useState } from 'react';

const CreateProposal: NextPage = () => {
  const [openRevisionModal, setOpenRevisionModal] = useState(false);

  return (
    <Box width="100%">
      <Head>
        <title>Create Proposal</title>
      </Head>
      <Heading whiteSpace="pre-line" my={4} variant="80" marginBottom="48px">
        Create Proposal
      </Heading>
      <Box>
        <VStack width="100%" alignItems="flex-start">
          <HStack alignItems="flex-start" padding="20px 0" width="100%">
            <Text width="20%">Jurisdiction Name:</Text>
            <Text>Costa Rica</Text>
          </HStack>
          <Divider />
          <HStack alignItems="flex-start" padding="20px 0" width="100%">
            <Text width="20%">Proposal Name:</Text>
            <Input width="60%" />
          </HStack>
          <Divider />
          <HStack alignItems="flex-start" padding="20px 0" width="100%">
            <Text width="20%">Description:</Text>
            <Textarea width="60%" />
          </HStack>
          <Divider />
          <HStack alignItems="flex-start" padding="20px 0" width="100%">
            <Text width="20%">Revisions:</Text>
            <VStack alignItems="flex-start" width="80%" gap="20px">
              <Button variant="Header" onClick={() => setOpenRevisionModal(true)}>
                Add new revision
              </Button>
            </VStack>
          </HStack>
          <Divider />
          <HStack flexDirection="row-reverse" width="100%" padding="20px 0">
            <Button variant="Header">Create proposal</Button>
          </HStack>
        </VStack>
      </Box>
      <AddRevisionModal isOpen={openRevisionModal} onClose={() => setOpenRevisionModal(false)} />
    </Box>
  );
};

export default CreateProposal;
