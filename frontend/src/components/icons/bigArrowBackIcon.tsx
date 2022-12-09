import React from 'react'
import { Icon } from '@chakra-ui/react'

type Props = {}

const BigArrowBackIcon = (props: Props) => {
    return (
        <Icon xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" {...props}>
            <mask id="a" width="24" height="24" x="0" y="0" maskUnits="userSpaceOnUse" style={{ maskType: 'alpha' } as any}><path fill="#D9D9D9" d="M0 0h24v24H0z"/></mask><g mask="url(#a)"><path fill="#2A2A2A" d="m12 20-8-8 8-8 1.425 1.4-5.6 5.6H20v2H7.825l5.6 5.6L12 20Z"/></g>
        </Icon>
    )
}

export default BigArrowBackIcon;
