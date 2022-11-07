import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Layout } from '@/components/Layout'
import { theme } from "styles/theme";

function App({ Component, pageProps }: AppProps) {

  console.log(theme);
  return (
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
  )
}

export default App