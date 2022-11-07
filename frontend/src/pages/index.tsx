import type { NextPage } from 'next'
import Head from 'next/head'
import { VStack, Flex, Heading, Box } from "@chakra-ui/layout"
import { Alert, AlertDescription, AlertIcon, AlertTitle, useToast, AlertStatus, Button } from '@chakra-ui/react'
import { useState, useCallback } from 'react'
import WalletIcon from '@/components/icons/walletIcon' 

import ReadGovernanceToken from '@/components/legacyDaoPoc/ReadGovernanceToken'
import ReadBox from '@/components/legacyDaoPoc/ReadBox'
import ReadGovernorContract from '@/components/legacyDaoPoc/ReadGovernorContract'
import NetworkInfo from '@/components/legacyDaoPoc/NetworkInfo'

import { useEthersState } from '@/store/AccountData'
import { useDebouncedEffect } from '@/utils/debounce'
import { homeLabels, getLabel } from '@/store/initial'


const Home: NextPage = () => {
  const ethersState = useEthersState(s => s.ethersProvider)
  const account = useEthersState(s => s.account)
  const chainId = useEthersState(s => s.chainId)
  const stateId = useEthersState(s => s.stateId)
  const [error, setError] = useState<string>("")
  const toast = useToast()

  const showToast = useCallback((description: string, type: AlertStatus = "success") => {
    toast({
      description: description,
      status: type,
      duration: 4000,
      isClosable: true,
    })
  }, [toast])

  const onBlockEvent = (num: number) => {
    showToast("New Block: " + num)
  }

  // Debounce handling changes to accounts and blockchains
  useDebouncedEffect(() => {
    ethersState?.on("block", onBlockEvent)
  }, () => {
    ethersState?.off("block", onBlockEvent)
  }, [stateId, ethersState, showToast])

  console.log('BOOM', account === '');
  return (
    <VStack width='100%' >
      <Head>
        <title>{homeLabels.pageTitle}</title>
      </Head>

      <Flex
        width='100%'
        margin={0}
        maxWidth='1140px'
        flexDirection='column'
      >
        {error &&
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        }
        <Heading
          whiteSpace='pre-line'
          fontSize='80px'
          fontWeight='400'
          lineHeight='80px'
          letterSpacing='0px'
          textAlign='left'
          my={4}
          marginBottom='48px'>
          {getLabel(account, homeLabels.mainTitle)}
        </Heading>
        {/* {account === '' &&
                    <Button
                        float='right'
                        width='321px'
                        rightIcon={<WalletIcon />}
                        fontWeight='700'
                        fontSize='15px'
                        lineHeight='20px'
                        color='brand.black'
                        background='brand.java' type="button" w='225px' onClick={() => ethersState?.connect()}
                        _hover={{
                            background: "brand.javaHover",
                          }}>
                        {homeLabels.ctaConnect}
                    </Button>
                }
        {account
          ? <Box mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg" boxShadow='md'>
            <Heading my={4} fontSize='xl' textAlign="center">Network Info</Heading>
            <NetworkInfo />
          </Box> : ""}

        {account
          ? <Box mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg" boxShadow='md'>
            <Heading my={4} fontSize='xl' textAlign="center">Governance Token</Heading>
            <ReadGovernanceToken
              account={account}
              toast={showToast}
            />
          </Box> : ""}
        {account
          ? <Box mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg" boxShadow='md'>
            <Heading my={4} fontSize='xl'>Box Contract</Heading>
            <ReadBox
              currentAccount={account}
            />
          </Box> : ""}
        {account && chainId
          ? <Box mb={0} p={4} w='100%' borderWidth="1px" borderRadius="lg" boxShadow='md'>
            <Heading my={4} fontSize='xl'>Governor Contract</Heading>
            <ReadGovernorContract
              chainId={chainId}
              currentAccount={account}
              toast={showToast}
            />
          </Box> : ""} */}
      </Flex>
    </VStack>
  )
}

export default Home