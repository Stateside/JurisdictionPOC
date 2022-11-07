import React, { ReactNode } from 'react'
import { Container, Box } from '@chakra-ui/react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useEthersState } from '@/store/AccountData'
import { siteLayoutData } from '@/store/initial'

type Props = {
  children: ReactNode
}

export function Layout(props: Props) {
  const ethersState = useEthersState()
  const { title, ctaConnect } = siteLayoutData
  console.log('AQUI', ethersState)
  return (
    <Box

      minHeight='100vh'
      maxW='container.xl'
      backgroundImage='url("/imgs/jurisdictionBackgroundShapes.svg")'
      backgroundPosition='right 25px'
      backgroundSize='65%'
      backgroundRepeat='no-repeat'
      margin='0 auto'
      padding='0 45px'
    >
      <Container
        position='relative'
        maxW='container.lg'
        py='8'
        minHeight={'100vh'}
        padding='0'
      >
        <Header siteTitle={title} ctaText={ctaConnect} />
        {props.children}
        <Footer />
      </Container>
    </Box>
  )
}