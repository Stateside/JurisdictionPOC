import type { NextPage } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { Heading, Box } from "@chakra-ui/layout"
import { Container, Link, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, VStack, Text } from '@chakra-ui/react'
import { listContractsLabels } from '@/store/initial'
import { useWeb3React } from "@web3-react/core";
import { ContractInfo } from '../api/getContracts'
import { getAccountShortName } from '@/utils/util'

const ListContracts: NextPage = () => {
  const { active, account } = useWeb3React();
  const [contracts, setContracts] = useState<ContractInfo[]>([])

  useEffect(() => {
    fetch("api/getContracts")
    .then((res:Response) => res.json())
    .then((json:ContractInfo[]) => setContracts(json))
  }, [])

  const filterContracts = (c:ContractInfo) => 
    ["JSCCabinet", "JSCGovernor", "JSCJurisdiction", "JSCTitleTokenTest"].includes(c.name)

  return (
    <Box width='100%' >
      <Head>
        <title>{listContractsLabels.pageTitle}</title>
      </Head>
        {active &&
          <VStack padding='2rem 0' margin='0 0 40px 0'>
            <Heading
              whiteSpace='pre-line'
              my={4}
              marginBottom='48px'>
              {listContractsLabels.heading}
            </Heading>
            <Container
                display='flex'
                width='100%'
                flexDirection='row'
                justifyContent='flex-start'
                maxWidth={'100%'}
                padding='0'>
                  <TableContainer whiteSpace={'normal'}>
                    <Table variant='simple'>
                      <TableCaption>Currently Deployed Contracts</TableCaption>
                      <Thead>
                        <Tr>
                          <Th>Name</Th>
                          <Th>Address</Th>
                          <Th flexWrap={'wrap'}>Description</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {contracts.filter(filterContracts).map(c => 
                          <Tr key={c.address}>
                            <Td>
                              {c.type === "contract" 
                                ? 
                                <NextLink href={{ pathname: 'contracts/'+c.name, query: { address: c.address } }}>
                                  <Link as='b' color={"darkblue"}>{c.name}</Link>
                                </NextLink>
                                : <Text color={"gray"}>{c.name}</Text>
                                }
                            </Td>
                            <Td>{getAccountShortName(c.address)}</Td>
                            <Td flexWrap={'wrap'}>{c.description}</Td>
                          </Tr>
                        )}
                      </Tbody>
                    </Table>
                  </TableContainer>
            </Container>
          </VStack>
          
        }
    </Box>
  )
}

export default ListContracts