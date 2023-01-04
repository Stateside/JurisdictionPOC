import type { NextPage } from 'next'
import Head from 'next/head'
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Link } from '@/components/Link';
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text
} from '@chakra-ui/react';

import Contracts from './Contracts';
import Members from './Members';
import Proposals from './Proposals';
import Properties from './Properties';


const Jurisdiction: NextPage = () => {

  const tabSelectedStyles = {
    color: '#000',
    borderColor: 'inherit',
    borderBottomColor: '#fff',
  };

  return (
    <Box width="100%">
      <Head>
        <title>Jurisdiction Name</title>
      </Head>
      <Link href="/" display="flex" fontWeight="bold">
        <ArrowBackIcon marginRight="10px" marginTop="5px" />
        <Text>Back to Dashboard / Jurisdiction</Text>
      </Link>
      <Heading whiteSpace="pre-line" my={4} marginBottom="48px">
        Jurisdiction Name
      </Heading>
      <Tabs variant="enclosed" borderColor="#D3D3D3">
        <TabList>
          <Tab fontWeight="bold" color="#A8A8A8" _selected={tabSelectedStyles}>
            Members
          </Tab>
          <Tab fontWeight="bold" color="#A8A8A8" _selected={tabSelectedStyles}>
            Contracts
          </Tab>
          <Tab fontWeight="bold" color="#A8A8A8" _selected={tabSelectedStyles}>
            Proposals
          </Tab>
          <Tab fontWeight="bold" color="#A8A8A8" _selected={tabSelectedStyles}>
            Tokens
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Members />
          </TabPanel>
          <TabPanel>
            <Contracts />
          </TabPanel>
          <TabPanel>
            <Proposals />
          </TabPanel>
          <TabPanel>
            <Properties />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );

}

export default Jurisdiction;