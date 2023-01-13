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
import Config from './Config';
import { useRouter } from 'next/router';
import { useJurisdictions } from '@/store/useJurisdictions';

const Jurisdiction: NextPage = () => {
  const router = useRouter();
  const jurisdictionAddress = router.query.id as string;
  const name = useJurisdictions(state => state.infos[jurisdictionAddress]?.name)

  const tabSelectedStyles = {
    color: '#000',
    borderColor: 'inherit',
    borderBottomColor: '#fff',
  };

  return (
    <Box width="100%">
      <Head>
        <title>{name} Details</title>
      </Head>
      <Link href="/" display="flex" fontWeight="bold">
        <ArrowBackIcon marginRight="10px" marginTop="5px" />
        <Text>Back to Dashboard / Jurisdiction</Text>
      </Link>
      <Heading whiteSpace="pre-line" variant="80" my={4} marginBottom="48px">
        {name}
      </Heading>
      <Tabs variant="enclosed" borderColor="#D3D3D3">
        <TabList>
          <Tab fontWeight="bold" color="#A8A8A8" _selected={tabSelectedStyles}>
            Configuration
          </Tab>
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
            Properties
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Config />
          </TabPanel>
          <TabPanel>
            <Members />
          </TabPanel>
          <TabPanel pr={0} pl={0} pb={0} pt={5}>
            <Contracts />
          </TabPanel>
          <TabPanel pr={0} pl={0} pb={0} pt={5}>
            <Proposals />
          </TabPanel>
          <TabPanel pr={0} pl={0} pb={0} pt={5}>
            <Properties />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );

}

export default Jurisdiction;