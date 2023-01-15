import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Button, Divider, Heading, HStack, Input, Link, Text, Textarea, VStack } from '@chakra-ui/react';
import Revision from './Revision';
import AddRevisionModal from './AddRevisionModal';
import { useState } from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

const CreateProposal: NextPage = () => {
  const router = useRouter();
  const [openRevisionModal, setOpenRevisionModal] = useState(false);
  const [autoOpenedRevisionModel, setAutoOpenedRevisionModel] = useState(false);
  const p = router.query.p as string // Default proposal
  const [ defaultContract, defaultRevision ] = p ? p.split('/') : [null, null]

  if (defaultContract && !openRevisionModal && !autoOpenedRevisionModel) {
    setAutoOpenedRevisionModel(true)
    setOpenRevisionModal(true)
  }

  return (
    <Box width="100%">
      <Head>
        <title>Create a Proposal</title>
      </Head>
      <Link onClick={() => router.back()} display="flex" fontWeight="bold">
        <ArrowBackIcon marginRight="10px" marginTop="5px" />
        <Text>Back to Dashboard</Text>
      </Link>
      <Heading whiteSpace="pre-line" my={4} variant="80" marginBottom="48px">
        Create Proposal
      </Heading>
      <Divider marginBottom="10px" borderColor="#D3D3D3" />
      <Box>
        <VStack width="100%" alignItems="flex-start">
          <HStack alignItems="flex-start" padding="20px 0" width="100%">
            <Text width="20%">Jurisdiction Name:</Text>
            <Text>Costa Rica</Text>
          </HStack>
          <Divider />
          <HStack alignItems="flex-start" padding="20px 0" width="100%">
            <Text width="20%">Proposal Name:</Text>
            <Input width="40%" backgroundColor="#ffffff" />
          </HStack>
          <Divider />
          <HStack alignItems="flex-start" padding="20px 0" width="100%">
            <Text width="20%">Description:</Text>
            <Textarea width="40%" backgroundColor="#ffffff" />
          </HStack>
          <Divider />
          <HStack alignItems="flex-start" padding="20px 0" width="100%">
            <Text width="20%">Revisions:</Text>
            <VStack alignItems="flex-start" width="80%" gap="20px">
              <Revision />
              <Button
                variant="Header"
                onClick={() => setOpenRevisionModal(true)}
              >
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
      <AddRevisionModal
        isOpen={openRevisionModal}
        onClose={() => setOpenRevisionModal(false)}
      />
    </Box>
  );
};

export default CreateProposal;
