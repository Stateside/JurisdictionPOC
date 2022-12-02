import React from 'react'
import { Icon } from '@chakra-ui/react'

type Props = {}

const CallReceivedIcon = (props: Props) => {
    return (
        <Icon xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="none" {...props}>
            <mask id="a" width="24" height="24" x="0" y="0" maskUnits="userSpaceOnUse" style={{ maskType: 'alpha' }}><path fill="#D9D9D9" d="M0 0h24v24H0z"/></mask><g mask="url(#a)"><path fill="#2A2A2A" d="M5 19V9h2v6.6L18.6 4 20 5.4 8.4 17H15v2H5Z"/></g>
        </Icon>
    )
}

export default CallReceivedIcon;
