import React from 'react'
import { Icon } from '@chakra-ui/react'

type Props = {}

const SmallArrowBackIcon = (props: Props) => {
    return (
        <Icon xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" {...props}>
            <mask id="a" width="20" height="20" x="0" y="0" maskUnits="userSpaceOnUse" style={{ maskType: 'alpha' } as any}><path fill="#D9D9D9" d="M0 0h20v20H0z"/></mask><g mask="url(#a)"><path fill="#2A2A2A" d="m10 16-6-6 6-6 1.062 1.062L6.875 9.25H16v1.5H6.875l4.187 4.188L10 16Z"/></g>
        </Icon>
    )
}

export default SmallArrowBackIcon;
