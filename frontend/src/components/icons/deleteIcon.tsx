import React from 'react'
import { Icon } from '@chakra-ui/react'

type Props = {
    height?: number,
    width?: number
}

const DeleteIcon = (props: Props) => {
    return (
        <Icon xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" {...props}>
            <mask id="a" width="24" height="24" x="0" y="0" maskUnits="userSpaceOnUse" style={{ maskType: 'alpha' } as any}><path fill="#D9D9D9" d="M0 0h24v24H0z"/></mask><g mask="url(#a)"><path fill="#2A2A2A" d="M7 21c-.55 0-1.02-.196-1.412-.587A1.927 1.927 0 0 1 5 19V6H4V4h5V3h6v1h5v2h-1v13c0 .55-.196 1.021-.587 1.413A1.928 1.928 0 0 1 17 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9Z"/></g>
        </Icon>
    )
}

export default DeleteIcon;
