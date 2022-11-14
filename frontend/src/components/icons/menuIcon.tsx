import React from 'react'
import { Icon } from '@chakra-ui/react'

type Props = {}

const MenuIcon = (props: Props) => {
    return (
        <Icon xmlns="http://www.w3.org/2000/svg" width="18px" height="19px" fill="none" {...props}>
            <mask id="mask0_206_505" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_206_505)">
                <path d="M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z" fill="white" />
            </g>
        </Icon>
    )
}

export default MenuIcon;
