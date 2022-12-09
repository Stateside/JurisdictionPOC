import type { NextPage } from 'next'
import Head from 'next/head'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react';

import Members from './Members';

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
            <p>Contracts Tabs</p>
          </TabPanel>
          <TabPanel>
            <p>Proposals Tab</p>
          </TabPanel>
          <TabPanel>
            <p>four!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );

}

export default Jurisdiction;