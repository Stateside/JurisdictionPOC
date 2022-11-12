import React, { ReactNode } from 'react'
import { Container, Box } from '@chakra-ui/react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { siteLayoutData, siteMainMenu } from '@/store/initial'

type Props = {
  children: ReactNode
}

export function Layout(props: Props) {
  const { title, ctaConnect } = siteLayoutData
  return (
    <Box
      minHeight='100vh'
      maxW='container.xl'
      backgroundImage='url("/imgs/jurisdictionBackgroundShapes.svg")'
      backgroundPosition={{ base: 'bottom', sm: 'bottom', md: 'right', lg: 'right' }}
      backgroundSize={{ base: '100%', sm: '100%', md: '80%', lg: '65%' }}
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
        <Header siteTitle={title} ctaText={ctaConnect} menu={siteMainMenu}/>
        {props.children}
        <Footer />
      </Container>
    </Box>
  )
}