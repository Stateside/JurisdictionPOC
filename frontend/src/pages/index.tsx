import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { VStack, Flex, Heading } from "@chakra-ui/layout"
import { Alert, AlertDescription, AlertIcon, AlertTitle, Button } from '@chakra-ui/react'
import WalletIcon from '@/components/icons/WalletIcon'
import Connect from '@/components/Connect'
import { homeLabels, getLabel } from '@/store/initial'
import { useWeb3React } from "@web3-react/core";

const Home: NextPage = () => {
  const [error, setError] = useState<string>("")
  const { active } = useWeb3React();

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
            ctaText={homeLabels.ctaConnect} />
        }
      </Flex>
    </VStack>
  )
}

export default Home