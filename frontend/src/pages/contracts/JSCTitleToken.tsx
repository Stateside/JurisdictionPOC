import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import { Heading, Box } from "@chakra-ui/layout"
import { Alert, AlertDescription, AlertIcon, AlertTitle, Checkbox, Container, List, ListItem, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, UnorderedList, VStack } from '@chakra-ui/react'
import { jscTitleTokenLabels } from '@/store/initial'
import { useWeb3React } from "@web3-react/core";
import * as tc from "../../../typechain-types"
import { useRouter } from 'next/router'
import Loader from '@/components/Loader'
import { accountsByAddress } from '@/utils/accounts'
import Link from 'next/link'
import { ethers } from 'ethers'

type Offer = {
  buyer: string
  amount: number
}

type Token = {
  tokenId: string
  titleId: string
  owner: string
  ownerFrozen: boolean
  frozen: boolean
  offersToBuy: Offer[]
  offersToSell: Offer[]
  url: string
}

const showJSCTitleToken: NextPage = () => {
  const [localError, setLocalError] = useState<string>("")
  const { active, account, library, error } = useWeb3React();
  const router = useRouter()
  const [tokens, setTokens] = useState<Token[]>([])
  const [loading, setLoading] = useState(true)

  const [jscTitleToken, setJSCTitleToken] = useState<tc.IJSCTitleToken|undefined>(undefined)
  const lastError = useMemo(() => localError || error?.cause as unknown as string, [localError, error])

  // Connect to JSCTitleToken contract
  useEffect(() => {
    if (library && router.query.address)
      try {
        setJSCTitleToken(tc.IJSCTitleToken__factory.connect(router.query.address as string, library))
      } catch(err) {
        setLocalError(err as string)
      }
  }, [library, router.query.address])

  // When we are connected to the JSCGovernor contract...
  // Get the IDs of all the proposals
  useEffect(() => {
    if (jscTitleToken) {
      const loadData = async () => {
        let _tokens:Token[] = []
        const tCount = (await jscTitleToken.totalSupply()).toNumber();
        for (let ti = 0; ti < tCount; ti++) {
          const t = await jscTitleToken.tokenAtIndex(ti)
          const owner = await jscTitleToken.ownerOf(t)
          const url = ""//await jscTitleToken.tokenURI(t)
          const frozen  = await jscTitleToken.isFrozenToken(t)
          const titleId = await jscTitleToken.tokenToTitleId(t)
          const offersToBuy:Offer[] = []
          const offersToSell:Offer[] = []
          const obCount = (await jscTitleToken.countOffersToBuy(t)).toNumber()
          for (let obi = 0; obi < obCount; obi++) {
            const ob = await jscTitleToken.offerToBuyAtIndex(t, obi);
            offersToBuy.push({
              amount: parseFloat(ethers.utils.formatEther(ob.amount)),
              buyer: accountsByAddress[ob.buyer.toLowerCase()].name,
            })
          }
          const osCount = (await jscTitleToken.countOffersToSell(t)).toNumber()
          for (let osi = 0; osi < osCount; osi++) {
            const os = await jscTitleToken.offerToSellAtIndex(t, osi);
            offersToSell.push({
              amount: parseFloat(ethers.utils.formatEther(os.amount)),
              buyer: accountsByAddress[os.buyer.toLowerCase()].name,
            })
          }
          _tokens.push({
            tokenId: t.toHexString(),
            titleId,
            frozen,
            owner: accountsByAddress[owner.toLowerCase()].name,
            ownerFrozen: await jscTitleToken.isFrozenOwner(owner),
            url,
            offersToBuy,
            offersToSell
          })
        }
        setTokens(_tokens)
        setLoading(false)
      }
      loadData().catch(err => {
        console.log(err)
        setLocalError(err.toString())
        setLoading(false)
      })
    }
  }, [jscTitleToken])

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