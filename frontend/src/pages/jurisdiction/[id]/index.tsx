import type { NextPage } from 'next'
import Head from 'next/head'
import { Box, Heading, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Contracts from './tabs/Contracts';
import Members from './tabs/Members';
import Proposals from './tabs/Proposals';
import Properties from './tabs/Properties';
import Config from './tabs/Config';
import { useRouter } from 'next/router';
import { useJurisdictions } from '@/store/useJurisdictions';
import { useMemo } from 'react';
import Breadcrumb from '@/components/Breadcrumb';

const tabSelectedStyles = {
  color: 'black',
  borderColor: 'inherit',
  borderBottomColor: '#fff',
};
const tabHoveredStyles = {
  color: 'gray',
  borderColor: 'inherit',
};

const Jurisdiction: NextPage = () => {
  const router = useRouter();
  const jurisdictionAddress = (router.query.id as string)?.toLowerCase();
  const name = useJurisdictions(state => state.infos[jurisdictionAddress]?.name)

  const tabInfo = [
    {label: "Configuration", tag: "config", content: <Config />},
    {label: "Members", tag: "members", content: <Members />},
    {label: "Contracts", tag: "contracts", content: <Contracts />},
    {label: "Proposals", tag: "proposals", content: <Proposals />},
    {label: "Properties", tag: "properties", content: <Properties />},
  ]

  // Get the selected tab from the URL
  const tabNumber = useMemo(() => {
    try {
      if (router.query.tab) {
        const i = tabInfo.findIndex(ti => ti.tag===(router.query.tab as string))
        return i<0 ? 1 : i+1;
      }
    } catch (e) {}
    return 1
  }, [router.query.tab])

  // Store the selected tab in the URL to keep it in the history
  const setTabNumber = (tab: number) => {
    router.push(`/jurisdiction/${jurisdictionAddress}?tab=${tabInfo[tab-1].tag}`);
  } 
  
  return (
    <Box width="100%">
      <Head>
        <title>{name} Details</title>
      </Head>
      <Breadcrumb items={[
        {label:"Jurisdiction", href:""},
      ]}/>
      <Heading whiteSpace="pre-line" variant="80" my={4} marginBottom="48px">
        {name}
      </Heading>
      <Tabs variant="enclosed" borderColor="#D3D3D3" isManual={true} index={tabNumber-1} onChange={t => setTabNumber(t+1)}>
        <TabList>
          {tabInfo.map((tab, i) => {
            return (
              <Tab fontWeight="bold" _selected={tabSelectedStyles} color="darkgray" _hover={tabHoveredStyles} key={tab.label}>
                {tab.label}
              </Tab>
            )})}
        </TabList>
        <TabPanels>
        {tabInfo.map(tab => (
            <TabPanel key={tab.label}>
              {tab.content}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );

}

export default Jurisdiction;