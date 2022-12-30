import React, { ReactNode, useEffect } from 'react'
import { Container, Box } from '@chakra-ui/react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { siteLayoutData, siteMainMenu } from '@/store/initial'
import ConnectCheck from './ConnectCheck'
import { useWeb3React } from '@web3-react/core'
import { useLikes } from '@/store/likes'

type Props = {
  children: ReactNode
}

export function Layout(props: Props) {
  const { account, chainId } = useWeb3React();
  const likes = useLikes();
  const { title, ctaConnect } = siteLayoutData

  // Load the likes from the database, then reload when account or chainId changes
  useEffect(() => {
    if (account && chainId && process.env.NEXT_PUBLIC_FRONTEND) {
      if (!likes.loaded || likes.owner !== account || likes.chainId !== chainId)
        likes.load(account, process.env.NEXT_PUBLIC_FRONTEND, chainId);
    }
  }, [account, chainId, likes.loaded])

  return (
    <Box
      minHeight='100vh'
      maxW='container.xl'
      backgroundImage='url("/imgs/jurisdictionBackgroundShapes.svg")'
      backgroundPosition={{ base: 'bottom', sm: 'bottom', md: 'right', lg: 'right' }}
      backgroundSize={{ base: '100%', sm: '100%', md: '80%', lg: '65%' }}
      backgroundRepeat='no-repeat'
      margin='0 auto'
      padding={{base: '0 20px', sm: '0 20px', md: '0 30px', lg: '0 45px' }}
    >
      <Container
        position='relative'
        maxW='container.lg'
        py='8'
        minHeight={'100vh'}
        padding='0'
      >
        <Header siteTitle={title} ctaText={ctaConnect} menu={siteMainMenu} />
        <ConnectCheck />
        {props.children}
        <Footer />
      </Container>
    </Box>
  )
}