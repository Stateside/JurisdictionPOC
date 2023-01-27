import type { NextPage } from 'next';
import Head from 'next/head';
import {
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';
import { Link } from '@/components/Link';
import Property from './Property';
import { ArrowBackIcon } from '@chakra-ui/icons';

const MyProperties: NextPage = () => {
  return (
    <Box width="100%">
      <Head>
        <title>Create Proposal</title>
      </Head>
      <Link href="/" display="flex" fontWeight="bold">
        <ArrowBackIcon marginRight="10px" marginTop="5px" />
        <Text>Back to Dashboard</Text>
      </Link>
      <Heading whiteSpace="pre-line" marginBottom="48px" variant="80">
        My properties
      </Heading>
      <Box width="70%">
        <Property />
        <Property />
        <Property />
        <Property />
      </Box>
    </Box>
  );
};

export default MyProperties;
