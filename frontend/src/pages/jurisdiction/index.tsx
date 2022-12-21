import type { NextPage } from 'next'
import Head from 'next/head'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react';

import Contracts from './Contracts';
import Members from './Members';
import Proposals from './Proposals';
import Properties from './Properties';


const Jurisdiction: NextPage = () => {
  return (
    <Box width="100%">
      <Head>
        <title>Jurisdiction Name</title>
      </Head>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Members</Tab>
          <Tab>Contracts</Tab>
          <Tab>Proposals</Tab>
          <Tab>Properties</Tab>
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