import React from 'react'
import { Icon } from '@chakra-ui/react'

type Props = {}

const PaymentsIcon = (props: Props) => {
    return (
        <Icon xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="none" {...props}>
            <mask id="a" width="24" height="24" x="0" y="0" maskUnits="userSpaceOnUse" style={{ maskType: 'alpha' } as any}><path fill="#D9D9D9" d="M0 0h24v24H0z"/></mask><g mask="url(#a)"><path fill="#2A2A2A" d="M14 13a2.893 2.893 0 0 1-2.125-.875A2.893 2.893 0 0 1 11 10c0-.833.292-1.542.875-2.125A2.893 2.893 0 0 1 14 7c.833 0 1.542.292 2.125.875S17 9.167 17 10s-.292 1.542-.875 2.125A2.893 2.893 0 0 1 14 13Zm-7 3c-.55 0-1.02-.196-1.412-.588A1.923 1.923 0 0 1 5 14V6c0-.55.196-1.02.588-1.412A1.923 1.923 0 0 1 7 4h14c.55 0 1.021.196 1.413.588.391.391.587.862.587 1.412v8c0 .55-.196 1.02-.587 1.412A1.927 1.927 0 0 1 21 16H7Zm2-2h10c0-.55.196-1.021.587-1.413A1.928 1.928 0 0 1 21 12V8c-.55 0-1.021-.196-1.413-.588A1.925 1.925 0 0 1 19 6H9c0 .55-.196 1.02-.588 1.412A1.923 1.923 0 0 1 7 8v4c.55 0 1.02.196 1.412.587.392.392.588.863.588 1.413Zm11 6H3c-.55 0-1.02-.196-1.412-.587A1.927 1.927 0 0 1 1 18V7h2v11h17v2Z"/></g></Icon>
    )
}

export default PaymentsIcon;
