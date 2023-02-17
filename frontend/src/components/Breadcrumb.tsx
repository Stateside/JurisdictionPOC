import ArrowBack from '@/components/icons/smallArrowBackIcon';
import { Breadcrumb as ChakraBreadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from '@chakra-ui/react';
import React from 'react'
import { Link } from './Link'

export type BreadscrumbItem = {
  label: string
  href: string
}
export type BreadcrumbProps = {
  items: BreadscrumbItem[]
}

const Breadcrumb = (props: BreadcrumbProps) => {
  const { items } = props
  const links = items.slice(0, -1)
  const last = items[items.length - 1]

  return (
    <ChakraBreadcrumb fontWeight="700" fontSize={{ base: '15px' }}>
      <BreadcrumbItem h={{ base: '30px' }}>
        <Link href="/" display='flex' h='30px' style={{alignItems: 'center'}}>
            <ArrowBack w={{ base: '23px' }} style={{display: 'flex', height: '30px', paddingTop: '5px'}} />
            Back to dashboard
        </Link>
      </BreadcrumbItem>

      {
        links.map(link => (
          <BreadcrumbItem h={{ base: '30px' }} key={link.label}>
            <Link href={link.href}>
              {link.label}
            </Link>
          </BreadcrumbItem>)
        )
      }

      <BreadcrumbItem h={{ base: '30px' }}>
        <Link href={last.href}>
          {last.label}
        </Link>
      </BreadcrumbItem>
    </ChakraBreadcrumb>
  )
}

export default Breadcrumb