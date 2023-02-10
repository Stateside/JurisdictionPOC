import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import { Heading, Box } from "@chakra-ui/layout"
import { Alert, AlertDescription, AlertIcon, AlertTitle, Container, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import { jscJurisdictionLabels } from '@/store/initial'
import { useWeb3React } from "@web3-react/core";
import * as tc from "../../../typechain-types"
import { useRouter } from 'next/router'
import { ParamType } from '@/utils/types'
import Loader from '@/components/Loader'
import { getAccountShortName } from '@/utils/util'
import { Link } from '@/components/Link'

type JurisdictionContracts = {
  name: string
  address: string
  description: string
}

const getPathForContract = (key:string) => {
  switch(key.replace("jsc.contracts.","")) {
    case "cabinet": return "/contracts/JSCCabinet"
    case "governor": return "/contracts/JSCGovernor"
    case "tokens": return "/contracts/JSCTitleToken"
  }
}

const showJSCJurisdiction: NextPage = () => {
  const [localError, setLocalError] = useState<string>("")
  const { active, library, error, connector } = useWeb3React();
  const router = useRouter()
  const [contracts, setContracts] = useState<JurisdictionContracts[]>([])

  const [jscJurisdiction, setJSCJurisdiction] = useState<tc.IJSCJurisdiction|undefined>(undefined)
  const lastError = useMemo(() => localError || error?.cause?.toString(), [localError, error])

  useEffect(() => {
    if (library && router.query.address)
      try {
        setJSCJurisdiction(tc.IJSCJurisdiction__factory.connect(router.query.address as string, library))
      } catch(err:any) {
        setLocalError(err?err.toString():"unknown error")
      }
  }, [library, router.query.address])

  useEffect(() => {
    if (jscJurisdiction) {
      const loadData = async () => {
        let _contracts:JurisdictionContracts[] = []
        let i = await jscJurisdiction.iterateParameters()
        while(await jscJurisdiction.isValidParameterIterator(i)){
          const p = await jscJurisdiction.parameterIteratorGet(i);
          if (p.ptype == ParamType.t_contract) {
            let a = await jscJurisdiction.getContractParameter(p.name);
            _contracts.push({name:p.name, address:a, description:p.description})
          }
          i = await jscJurisdiction.nextParameter(i)
        }
        setContracts(_contracts)
      }
      loadData().catch(err => setLocalError(err?err.toString():"unknown error"))
    }
  }, [jscJurisdiction])

  return (
    <Box width='100%' >
      <Head>
        <title>{jscJurisdictionLabels.pageTitle}</title>
      </Head>
        {active &&
          <VStack padding='2rem 0' margin='0 0 40px 0'>
            <Heading
              whiteSpace='pre-line'
              my={4}
              marginBottom='48px'>
              {jscJurisdictionLabels.heading}
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
                  (contracts.length == 0 ? <Loader /> : 
                  <TableContainer whiteSpace={'normal'}>
                    <Table variant='simple'>
                      <TableCaption>{jscJurisdictionLabels.tableCaption}</TableCaption>
                      <Thead>
                        <Tr>
                          <Th>Name</Th>
                          <Th>Address</Th>
                          <Th flexWrap={'wrap'}>Description</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {contracts.map(c => 
                          <Tr key={c.name}>
                            <Td>
                              <Link href={{ pathname: getPathForContract(c.name), query: { address: c.address } }}>
                                {c.name}
                              </Link>
                            </Td>
                            <Td>{getAccountShortName(c.address)}</Td>
                            <Td flexWrap={'wrap'}>{c.description}</Td>
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

export default showJSCJurisdiction