import React from 'react'
import { Icon } from '@chakra-ui/react'

type Props = {}

const CallMadeIcon = (props: Props) => {
    return (
        <Icon xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="none" {...props}>
            <mask id="a" width="24" height="24" x="0" y="0" maskUnits="userSpaceOnUse" style={{ maskType: 'alpha' }}><path fill="#D9D9D9" d="M0 0h24v24H0z"/></mask><g mask="url(#a)"><path fill="#2A2A2A" d="M5.4 20 4 18.6 15.6 7H9V5h10v10h-2V8.4L5.4 20Z"/></g>
        </Icon>
    )
}

export default CallMadeIcon;
