import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import { Heading, Box } from "@chakra-ui/layout"
import { Alert, AlertDescription, AlertIcon, AlertTitle, Container, List, ListItem, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import { jscGovernorLabels } from '@/store/initial'
import { useWeb3React } from "@web3-react/core";
import * as tc from "../../../typechain-types"
import { useRouter } from 'next/router'
import { ProposalState } from '@/utils/types'
import Loader from '@/components/Loader'
import { createSampleProposals } from '@/utils/sample-proposals'
import { PreparedProposal } from '@/utils/proposals'
import { getAccountShortName } from '@/utils/util'
import { ethers } from 'ethers'

type PreparedProposalMap = {[hash:string]: PreparedProposal}
type BlockchainProposal = {id: string, state: ProposalState}
type BlockchainProposalMap = {[hash:string]: BlockchainProposal}

const showJSCGovernor: NextPage = () => {
  const [localError, setLocalError] = useState<string>("")
  const { active, account, library, error } = useWeb3React();
  const router = useRouter()
  const [jscProposals, setJSCProposals] = useState<BlockchainProposalMap>({})
  const [sampleProposals, setSampleProposals] = useState<PreparedProposalMap>({})

  const [jscJurisdiction, setJSCJurisdiction] = useState<tc.IJSCJurisdiction|undefined>(undefined)
  const [jscGovernor, setJSCGovernor] = useState<tc.IJSCGovernor|undefined>(undefined)
  const [jscCabinet, setJSCCabinet] = useState<tc.IJSCCabinet|undefined>(undefined)
  const [jscTitleToken, setJSCTitleToken] = useState<tc.IJSCTitleToken|undefined>(undefined)
  const lastError = useMemo(() => localError || error?.cause as unknown as string, [localError, error])

  // Create a map of address -> Contract name
  const localContracts:{[name:string]: string} = {}
  if (jscJurisdiction) localContracts[jscJurisdiction.address] = "JSCJurisdiction"
  if (jscGovernor) localContracts[jscGovernor.address] = "JSCGovernor"
  if (jscCabinet) localContracts[jscCabinet.address] = "JSCCabinet"
  if (jscTitleToken) localContracts[jscTitleToken.address] = "JSCTitleToken"

  // We will store proposal details in a database when they are created
  // These will need to be loaded here with a useEffect()

  // We also have some sample proposals in '@/utils/sample-proposals'
  // To load these sample proposals we need to do the following: 
  // 1) Connect to the Governor contract
  // 2) Get jurisdiction from the governor
  // 3) then get the other contracts from the jurisdiction
  // 4) then load the sample proposals using createSampleProposals(jscGovernor, jscCabinet, jscTitleToken)
  // 5) retrieve the list of proposal IDs and their states
  // 6) then display content of the governor contract
  //
  // If we are not using the sample proposals, steps 2..4 is not necessary

  // Connect to JSCGovernor contract
  useEffect(() => {
    if (library && router.query.address)
      try {
        setJSCGovernor(tc.IJSCGovernor__factory.connect(router.query.address as string, library))
      } catch(err) {
        setLocalError(err as string)
      }
  }, [library, router.query.address])

  // When we are connected to the JSCGovernor contract...
  // Connect to JSCJurisdiction contract
  useEffect(() => {
    const getJurisdictionAddress = async () => {
      try {
        if (jscGovernor)
          setJSCJurisdiction(tc.IJSCJurisdiction__factory.connect(await jscGovernor.getJurisdiction(), library))
      } catch(err) {
        setLocalError(err as string)
      }
    }
    if (library && jscGovernor)
      getJurisdictionAddress().catch(err => setLocalError(err.toString()))
  }, [library, jscGovernor])

  // When we are connected to the JSCJurisdicion contract...
  // Connect to the JSCGovernor, JSCCabinet contracts
  // These might be the same as the ones in api/getContracts but it's safer to get them from the JSCJurisdiction itself
  useEffect(() => {
    const getAddresses = async () => {
      if (library && router.query.address && jscJurisdiction)
        try {
          setJSCCabinet(tc.IJSCCabinet__factory.connect(await jscJurisdiction.getContractAddress('jsc.contracts.cabinet') as string, library))
          setJSCTitleToken(tc.IJSCTitleToken__factory.connect(await jscJurisdiction.getContractAddress('jsc.contracts.tokens') as string, library))
        } catch(err) {
          setLocalError((err as any).toString())
        }
    }
    getAddresses().catch(err => setLocalError(err.toString()))
  }, [library, router.query.address, jscJurisdiction])

  // When we are connected to all contracts...
  // Load the sample proposals. This is only for displaying details proposals in the JSCJurisdiction.
  // This is helpful because we do not store the details of the proposal onthe blockchain - only the hash (proposalId)
  useEffect(() => {
    const loadSampleProposals = async () => {
      if (jscGovernor && jscCabinet && jscTitleToken) {
        const sp = await createSampleProposals(ethers, jscGovernor, jscCabinet, jscTitleToken)
        const proposalMap:{[hash:string]: PreparedProposal} = {}
        for (let i = 0; i < sp.length; i++) {
          const p = sp[i];
          proposalMap[p.proposalHash.toHexString().toLowerCase()] = p
        }
        setSampleProposals(proposalMap)
      }
    }
    loadSampleProposals().catch(err => setLocalError(err.toString()))
  }, [jscGovernor, jscCabinet, jscTitleToken])

  // When we are connected to the JSCGovernor contract...
  // Get the IDs of all the proposals
  useEffect(() => {
    if (jscGovernor) {
      const loadData = async () => {
        let _proposals:BlockchainProposalMap = {}
        const pCount = (await jscGovernor.proposalCount()).toNumber();
        for (let pi = 0; pi < pCount; pi++) {
          const p = (await jscGovernor.proposalAtIndex(pi)).toHexString().toLowerCase();
          const state:ProposalState = await jscGovernor.state(p);
          _proposals[p] = {id: p, state: state}
        }
        setJSCProposals(_proposals)
      }
      loadData().catch(err => setLocalError(err.toString()))
    }
  }, [jscGovernor])

  return (
    <Box width='100%' >
      <Head>
        <title>{jscGovernorLabels.pageTitle}</title>
      </Head>
        {active &&
          <VStack padding='2rem 0' margin='0 0 40px 0'>
            <Heading
              whiteSpace='pre-line'
              my={4}
              marginBottom='48px'>
              {jscGovernorLabels.heading}
            </Heading>
            <Container
                display='flex'
                width='100%'
                flexDirection='row'
                justifyContent='flex-start'
                maxWidth={'100%'}
                padding='0'>
                  {lastError ?
                    <Alert status='error'>
                      <AlertIcon />
                      <AlertTitle>Error!</AlertTitle>
                      <AlertDescription>{lastError}</AlertDescription>
                    </Alert> :
                  (Object.keys(jscProposals).length == 0 ? <Loader /> : 
                    <TableContainer whiteSpace={'normal'}>
                      <Table variant='simple'>
                        <TableCaption>{jscGovernorLabels.tableCaption}</TableCaption>
                        <Thead>
                          <Tr>
                            <Th>Description</Th>
                            <Th>ID</Th>
                            <Th flexWrap={'wrap'}>Revs</Th>
                            <Th>State</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {Object.keys(jscProposals).map(p => 
                            <Tr key={p}>
                              <Td flexWrap={'wrap'}>{sampleProposals[p]?.description || "unknown"}</Td>
                              <Td>{getAccountShortName(p)}</Td>
                              <Td>
                                <List>
                                {sampleProposals[p] && sampleProposals[p].revs.map((r,i) =>
                                    <ListItem key={i}><>{localContracts[r.target.toString()] || getAccountShortName(r.target)}: {r.name}</></ListItem>
                                )}
                                </List>
                              </Td>
                              <Td>{ProposalState[jscProposals[p].state]}</Td>
                            </Tr>
                          )}
                        </Tbody>
                      </Table>
                    </TableContainer>)}
            </Container>
          </VStack>
          
        }
    </Box>
  )
}

export default showJSCGovernor