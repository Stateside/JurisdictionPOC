import React from 'react'
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
        <MenuList borderWidth="0" >
          <Box
            position="absolute"
            top="-15px"
            left="7px"
            borderLeft="20px solid transparent"
            borderRight="20px solid transparent"
            borderBottom="20px solid #fff"
            width="0"
            height="0"
          />
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
        </MenuList>
      </MenuChakra>
    );
}

export default Menu