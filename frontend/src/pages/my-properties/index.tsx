import type { NextPage } from 'next';
import Head from 'next/head';
import {
  Box,
  Heading,
  HStack,
  Text,
} from '@chakra-ui/react';
import Property from './Property';

const MyProperties: NextPage = () => {
  return (
    <Box width="100%">
      <Head>
        <title>Create Proposal</title>
      </Head>
      <Heading as="h1" size="3xl" whiteSpace="pre-line" marginBottom="48px">
        My properties
      </Heading>
      <Box>
        <Property />
        <Property />
        <Property />
        <Property />
      </Box>
    </Box>
  );
};

export default MyProperties;
