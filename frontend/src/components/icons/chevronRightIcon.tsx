import React from 'react'
import { Icon } from '@chakra-ui/react'

type Props = {}

const ChevronRightIcon = (props: Props) => {
    return (
        <Icon xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="none" {...props}>
            <mask id="a" width="24" height="24" x="0" y="0" maskUnits="userSpaceOnUse" style={{ maskType: 'alpha' } as any}><path fill="#333431" d="M0 0h24v24H0z"/></mask><g mask="url(#a)"><path fill="#2A2A2A" d="M9.4 18 8 16.6l4.6-4.6L8 7.4 9.4 6l6 6-6 6Z"/></g>
        </Icon>
    )
}

export default ChevronRightIcon;
