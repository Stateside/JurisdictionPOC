import React, { ReactNode, useEffect } from 'react'
import { Container, Box } from '@chakra-ui/react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { siteLayoutData } from '@/store/initial'
import ConnectCheck from './ConnectCheck'
import { useWeb3React } from '@web3-react/core'
import { useAliases } from '@/store/useAliases'
import { useLikes } from '@/store/useLikes'
import { useJurisdictions } from '@/store/useJurisdictions'
import { useGovernors } from '@/store/useGovernors'
import { useRevisions } from '@/store/useRevisions'
import { useTitleTokens } from '@/store/useTitleTokens'
import { useCabinets } from '@/store/useCabinets'

type Props = {
  children: ReactNode
}

export function Layout(props: Props) {
  const { account, chainId } = useWeb3React();
  const { title, ctaConnect } = siteLayoutData

  // Load the likes from the database, then reload when account or chainId changes
  const likes = useLikes();
  useEffect(() => { account && chainId && likes.init(account, chainId) }, [account, chainId])
  
  // Load the known jurisdictions from the database, then reload when chainId changes
  const jurisdictions = useJurisdictions();
  useEffect(() => { chainId && jurisdictions.init(chainId) }, [chainId])

  // Load the known aliases from the database. Aliases are shared among all blockchains, so no need to reload
  const aliases = useAliases();
  useEffect(() => { aliases.init() }, [])
  
  // Initialize the useGovernors hook, then reload when chainId changes
  const governors = useGovernors();
  useEffect(() => { chainId && governors.init(chainId) }, [chainId])

  // Initialize the useRevisions hook, then reload when chainId changes
  const revisions = useRevisions();
  useEffect(() => { chainId && revisions.init(chainId) }, [chainId])

  // Initialize the useRevisions hook, then reload when chainId changes
  const tokens = useTitleTokens();
  useEffect(() => { chainId && tokens.init(chainId, 12) }, [chainId])

  // Initialize the useCabinets hook, then reload when chainId changes
  const cabinets = useCabinets();
  useEffect(() => { chainId && cabinets.init(chainId) }, [chainId])

  return (
    <Box
      minHeight="100vh"
      backgroundImage='url("/imgs/jurisdictionBackgroundShapes.svg")'
      backgroundPosition={{
        base: 'bottom right',

      }}
      backgroundSize={{ base: '720px'}}
      maxW="1140px"
      backgroundRepeat="no-repeat"
      margin="0 auto"
      padding={{ base: '0 20px', sm: '0 20px', md: '0 30px', lg: '0 45px' }}
    >
      <Container
        display="flex"
        flexDirection="column"
        position="relative"
        maxW="container.lg"
        py="8"
        height={'100%'}
        minHeight={'100vh'}
        padding="0"
      >
        <Header siteTitle={title} ctaText={ctaConnect} />
        <ConnectCheck />
        <Box flexGrow={1}>{props.children}</Box>
        <Footer />
      </Container>
    </Box>
  );
}