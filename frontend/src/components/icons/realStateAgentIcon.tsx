import React from 'react'
import { Icon } from '@chakra-ui/react'

type Props = {}

const RealStateAgentIcon = (props: Props) => {
    return (
        <Icon xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="none" {...props}>
            <mask id="a" width="24" height="24" x="0" y="0" maskUnits="userSpaceOnUse" style={{ maskType: 'alpha' }}><path fill="#D9D9D9" d="M0 0h24v24H0z"/></mask><g mask="url(#a)"><path fill="#2A2A2A" d="M19 14V7.5L14 4 9 7.5V9H7V6.5l7-5 7 5V14h-2Zm-4.5-6h1V7h-1v1Zm-2 0h1V7h-1v1Zm2 2h1V9h-1v1Zm-2 0h1V9h-1v1ZM14 22.5l-7-1.95V22H1V11h7.95l6.2 2.3c.55.2.996.55 1.338 1.05.341.5.512 1.05.512 1.65h2c.833 0 1.542.275 2.125.825.583.55.875 1.275.875 2.175v1l-8 2.5ZM3 20h2v-7H3v7Zm10.95.4 5.95-1.85a.642.642 0 0 0-.338-.413A1.196 1.196 0 0 0 19 18h-4.8c-.517 0-.983-.033-1.4-.1a8.092 8.092 0 0 1-1.35-.35l-1.725-.6.575-1.9 2 .65c.3.1.65.175 1.05.225.4.05.95.075 1.65.075a.95.95 0 0 0-.162-.525.755.755 0 0 0-.388-.325L8.6 13H7v5.5l6.95 1.9Z"/></g>
        </Icon>
    )
}

export default RealStateAgentIcon;
