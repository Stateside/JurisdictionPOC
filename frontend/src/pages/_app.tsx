import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Layout } from '@/components/Layout'
import { theme } from "styles/theme";
import { Web3ReactProvider } from '@web3-react/core'
import { ethers } from "ethers";
import MetamaskProvider  from '@/components/MetamaskProvider'

function getLibrary(provider: any): any {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

function App({ Component, pageProps }: AppProps) {
  console.log('THEME INFORMATION:', theme);
  return (
    <ChakraProvider theme={theme}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <MetamaskProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MetamaskProvider>
      </Web3ReactProvider>
    </ChakraProvider>
  )
}

export default App