import Breadcrumb from "@/components/Breadcrumb"
import MyProperties from "@/components/MyProperties"
import { Box, Heading } from "@chakra-ui/react"
import { NextPage } from "next"
import Head from "next/head"

const MyPropertiesPage: NextPage = () => {
  return (
    <Box width="100%">
      <Head><title>My Properties</title></Head>
      <Breadcrumb items={[
        {label:"My Properties", href:""},
      ]}/>
      <Heading whiteSpace="pre-line" my={4} marginBottom="48px" variant="80">
        My properties
      </Heading>
      <Box width="70%">
        <MyProperties />
      </Box>
    </Box>
  )
}

export default MyPropertiesPage