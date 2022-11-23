import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { Flex, Heading, Box } from "@chakra-ui/layout"
import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react'
import Connect from '@/components/Connect'
import { homeLabels, getLabel } from '@/store/initial'
import { useWeb3React } from "@web3-react/core";
import { ethers } from 'ethers'

const Home: NextPage = () => {
  const [error, setError] = useState<string>("")
  const { active, account } = useWeb3React();
  // let etherscanProvider = new ethers.providers.EtherscanProvider();

  // console.log('TESTING', etherscanProvider.getHistory(account))

  return (
    <Box width='100%' >
      <Head>
        <title>{homeLabels.pageTitle}</title>
      </Head>
      {
        // Testing code ove here.
        // console.log('WEB3 ON YEAH', account, etherscanProvider)
      }
      {/* {
        etherscanProvider.getHistory(account).then((history) => {
          history.forEach((tx) => {
              console.log(tx);
          })
        })
      } */}
      <Flex
        width='100%'
        margin={0}
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
          variant={'80'}
          whiteSpace='pre-line'
          textAlign='left'
          my={4}
          marginBottom='48px'>
          {getLabel(active, homeLabels.mainTitle)}
        </Heading>

        {!active &&
          <Connect 
            variant='Heading'
            w='250px'
            label={homeLabels.ctaConnect}
            showError={true} />
        }
      </Flex>
    </Box>
  )
}

export default Home