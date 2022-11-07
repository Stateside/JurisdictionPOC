import React from 'react'
import { Icon } from '@chakra-ui/react'

type Props = {}

const SellIcon = (props: Props) => {
    return (
        <Icon xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" {...props}>
            <mask id="a" width="24" height="24" x="0" y="0" maskUnits="userSpaceOnUse" style={{ maskType: 'alpha' }}><path fill="#D9D9D9" d="M0 0h24v24H0z"/></mask><g mask="url(#a)"><path fill="#2A2A2A" d="M14.25 21.4c-.383.383-.858.575-1.425.575-.567 0-1.042-.192-1.425-.575l-8.8-8.8a2.069 2.069 0 0 1-.6-1.45V4c0-.55.196-1.021.588-1.413A1.925 1.925 0 0 1 4 2h7.15c.283 0 .55.054.8.162.25.109.467.255.65.438l8.8 8.825c.383.383.575.854.575 1.412a1.92 1.92 0 0 1-.575 1.413l-7.15 7.15ZM12.825 20l7.15-7.15L11.15 4H4v7.15L12.825 20ZM6.5 8c.417 0 .77-.146 1.062-.438C7.854 7.271 8 6.917 8 6.5c0-.417-.146-.77-.438-1.062A1.444 1.444 0 0 0 6.5 5c-.417 0-.77.146-1.062.438A1.444 1.444 0 0 0 5 6.5c0 .417.146.77.438 1.062.291.292.645.438 1.062.438Z"/></g>
        </Icon>
    )
}

export default SellIcon;
