import React from 'react'
import { Icon } from '@chakra-ui/react'

type Props = {}

const SearchIcon = (props: Props) => {
    return (
        <Icon xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" {...props}>
            <mask id="a" width="24" height="24" x="0" y="0" maskUnits="userSpaceOnUse" style={{ maskType: 'alpha' }}><path fill="#D9D9D9" d="M0 0h24v24H0z"/></mask><g mask="url(#a)"><path fill="#000" d="m19.6 21-6.3-6.3A6.096 6.096 0 0 1 9.5 16c-1.817 0-3.354-.629-4.612-1.887C3.629 12.854 3 11.317 3 9.5c0-1.817.63-3.354 1.888-4.613C6.146 3.629 7.683 3 9.5 3c1.817 0 3.354.629 4.613 1.887C15.371 6.146 16 7.683 16 9.5a6.096 6.096 0 0 1-1.3 3.8l6.3 6.3-1.4 1.4ZM9.5 14c1.25 0 2.313-.437 3.188-1.312S14 10.75 14 9.5c0-1.25-.437-2.313-1.312-3.188S10.75 5 9.5 5c-1.25 0-2.313.437-3.188 1.312S5 8.25 5 9.5c0 1.25.437 2.313 1.312 3.188S8.25 14 9.5 14Z"/></g>
        </Icon>
    )
}

export default SearchIcon;
