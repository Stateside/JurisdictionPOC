import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { VStack, Flex, Heading } from "@chakra-ui/layout"
import { Alert, AlertDescription, AlertIcon, AlertTitle, Button } from '@chakra-ui/react'
import WalletIcon from '@/components/icons/WalletIcon'
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
          <Button
            float='right'
            width='321px'
            rightIcon={<WalletIcon />}
            fontWeight='700'
            fontSize='15px'
            lineHeight='20px'
            color='brand.black'
            background='brand.java' type="button" w='225px' onClick={() => console.log('Login')}
            _hover={{
              background: "brand.javaHover",
            }}>
            {homeLabels.ctaConnect}
          </Button>
        }
      </Flex>
    </VStack>
  )
}

export default Home