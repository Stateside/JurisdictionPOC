import React from 'react';
import { Icon } from '@chakra-ui/react';

type Props = {
  height?: number;
  width?: number;
};

const LockIcon = (props: Props) => {
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      {...props}
    >
      <mask
        id="mask0_574_2967"
        style={{ maskType: 'alpha' } as any}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_574_2967)">
        <path
          d="M6 22C5.45 22 4.97933 21.8043 4.588 21.413C4.196 21.021 4 20.55 4 20V10C4 9.45 4.196 8.979 4.588 8.587C4.97933 8.19567 5.45 8 6 8H7V6C7 4.61667 7.48767 3.43733 8.463 2.462C9.43767 1.48733 10.6167 1 12 1C13.3833 1 14.5627 1.48733 15.538 2.462C16.5127 3.43733 17 4.61667 17 6V8H18C18.55 8 19.021 8.19567 19.413 8.587C19.8043 8.979 20 9.45 20 10V20C20 20.55 19.8043 21.021 19.413 21.413C19.021 21.8043 18.55 22 18 22H6ZM6 20H18V10H6V20ZM12 17C12.55 17 13.021 16.8043 13.413 16.413C13.8043 16.021 14 15.55 14 15C14 14.45 13.8043 13.979 13.413 13.587C13.021 13.1957 12.55 13 12 13C11.45 13 10.9793 13.1957 10.588 13.587C10.196 13.979 10 14.45 10 15C10 15.55 10.196 16.021 10.588 16.413C10.9793 16.8043 11.45 17 12 17ZM9 8H15V6C15 5.16667 14.7083 4.45833 14.125 3.875C13.5417 3.29167 12.8333 3 12 3C11.1667 3 10.4583 3.29167 9.875 3.875C9.29167 4.45833 9 5.16667 9 6V8Z"
          fill="#2A2A2A"
        />
      </g>
    </Icon>
  );
};

export default LockIcon;