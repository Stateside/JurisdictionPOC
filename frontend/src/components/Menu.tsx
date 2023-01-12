import React, { useState } from 'react'
import { Menu as MenuChakra, MenuButton, MenuList, MenuItem, IconButton, Text, Box } from '@chakra-ui/react'
import MenuIcon from '@/components/icons/menuIcon'
import { MenuItemInterface} from '@/interfaces/index';
import { Link } from './Link';

type Props = {
    items: Array<MenuItemInterface>
}

const Menu = (props: Props) => {
    const { items } = props;

    return (
      <MenuChakra variant={'mainMenu'} {...props}>
        <MenuButton
          width="54px"
          background="brand.grey.grey04"
          _hover={{ bg: 'brand.black' }}
          _active={{ bg: 'brand.black' }}
          as={IconButton}
          aria-label="Options"
          icon={<MenuIcon width="24px" height="24px" />}
          variant="outline"
        />
        <MenuList borderWidth="0" position="absolute" left="-170px" top="15px">
          {items.map((item, key) => {
            return (
              <MenuItem key={key}>
                <Link
                  href={item.url}
                  style={{ textDecoration: 'none' }}
                  _focus={{ boxShadow: 'none' }}
                >
                  <Text
                    fontSize="15px"
                    fontWeight="700"
                    lineHeight="20px"
                    letterSpacing="0px"
                    textAlign="left"
                  >
                    {item.label}
                  </Text>
                </Link>
              </MenuItem>
            );
          })}
          <Box
            position="absolute"
            top="-14px"
            right="12px"
            width="30px"
            height="30px"
            backgroundColor="#fff"
            transform="rotate(45deg)"
            boxShadow="-5px -5px 5px -5px rgb(0 0 0 / 10%)"
          />
        </MenuList>
      </MenuChakra>
    );
}

export default Menu