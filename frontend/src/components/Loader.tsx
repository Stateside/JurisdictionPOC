import React from 'react'
import { CircularProgress } from '@chakra-ui/react'
import { Center } from '@chakra-ui/react'

const Loader = () => {
    return (
        <Center bg='brand.grey.grey01' h='100vh'>
            <CircularProgress isIndeterminate color='brand.java' />
        </Center>
    )
}

export default Loader

