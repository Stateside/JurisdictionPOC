import Breadcrumb from "@/components/Breadcrumb"
import MyProperties from "@/components/MyProperties"
import usePersona from "@/store/usePersona"
import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useMemo } from "react"
import Properties from "./tabs/Properties"

const tabSelectedStyles = {
  color: 'black',
  borderColor: 'inherit',
  borderBottomColor: '#fff',
};
const tabHoveredStyles = {
  color: 'gray',
  borderColor: 'inherit',
};

const PropertiesPage: NextPage = () => {
  const router = useRouter();
  const { isMemberPersona } = usePersona()
  const jurisdictionAddress = (router.query.id as string)?.toLowerCase();

  const tabInfo = [
    {label: "My Properties", tag: "my-properties", content: (<Box width="70%"><MyProperties jurisdiction={jurisdictionAddress} /></Box>)},
    {label: "All Properties", tag: "all-properties", content: (<Properties />)}
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
    router.push(`/jurisdiction/${jurisdictionAddress}/properties?tab=${tabInfo[tab-1].tag}`);
  } 
  
  return (
    <>
      <Box width="100%">
        <Head>
          <title>Properties</title>
        </Head>
        <Breadcrumb items={
          isMemberPersona()
            ? [
                {label:"Jurisdiction", href:`/jurisdiction/${jurisdictionAddress}`},
                {label:"Properties", href:""}
              ]
            : [
                {label:"Properties", href:""}
              ]
          }/>
        <Heading whiteSpace="pre-line" my={4} marginBottom="48px" variant="80">
          Properties
        </Heading>
      </Box>
      <Box marginBottom="20px" width="100%">
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
            {tabInfo.map((tab, i) => (
              <TabPanel key={tab.label}>
                {tab.content}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
    </>
  )
}

export default PropertiesPage
