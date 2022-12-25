import type { NextPage } from 'next'
import Head from 'next/head'
import { useMemo, useState } from 'react'
import { Heading, Box } from "@chakra-ui/layout"
import { Alert, AlertDescription, AlertIcon, AlertTitle, Checkbox, Container, List, ListItem, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, UnorderedList, VStack } from '@chakra-ui/react'
import { jscTitleTokenLabels } from '@/store/initial'
import { useWeb3React } from "@web3-react/core";
import { useRouter } from 'next/router'
import Loader from '@/components/Loader'
import Link from 'next/link'
import useJSCTitleToken from '@/hooks/useJSCTitleToken'


const showJSCTitleToken: NextPage = () => {
  const [localError, setLocalError] = useState<string>("")
  const { active, account, library, error } = useWeb3React();
  const lastError = useMemo(() => localError || error?.cause as unknown as string, [localError, error])
  const router = useRouter()
  const {tokens, loading} = useJSCTitleToken(router.query.address as string)

  return (
    <Box width='100%' >
      <Head>
        <title>{jscTitleTokenLabels.pageTitle}</title>
      </Head>
        {active &&
          <VStack padding='2rem 0' margin='0 0 40px 0'>
            <Heading
              whiteSpace='pre-line'
              my={4}
              marginBottom='48px'>
              {jscTitleTokenLabels.heading}
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
                  (loading ? <Loader /> : tokens.length == 0 ? 
                    <Alert status='info'>
                      <AlertIcon />
                      <AlertTitle>Oops!</AlertTitle>
                      <AlertDescription>No Tokens Found!</AlertDescription>
                    </Alert> : 
                    <TableContainer whiteSpace={'normal'}>
                      <Table variant='simple'>
                        <TableCaption>{jscTitleTokenLabels.tableCaption}</TableCaption>
                        <Thead>
                          <Tr>
                            <Th>ID</Th>
                            <Th>Owner</Th>
                            <Th>URL</Th>
                            <Th>Frozen Token</Th>
                            <Th>Frozen Owner</Th>
                            <Th>Offers</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {tokens.map(t => 
                            <Tr key={t.tokenId}>
                              <Td>{t.titleId}</Td>
                              <Td>{t.owner}</Td>
                              <Td><Link href={t.url}>{t.url}</Link></Td>
                              <Td><Checkbox isChecked={t.frozen} readOnly={true} /></Td>
                              <Td><Checkbox isChecked={t.ownerFrozen} readOnly={true} /></Td>
                              <Td>
                                <List>
                                {t.offersToBuy.map((o,i) =>
                                    <ListItem key={i}><>Offer to buy from {o.buyer} for {o.amount}</></ListItem>
                                )}
                                {t.offersToSell.map((o,i) =>
                                    <ListItem key={i}><>Offer to buy from {o.buyer} for {o.amount}</></ListItem>
                                )}
                                </List>
                              </Td>
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

export default showJSCTitleToken