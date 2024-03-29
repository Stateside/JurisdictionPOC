import React from 'react'
import { Menu as MenuChakra, MenuButton, MenuList, MenuItem, IconButton, Text, Box, MenuGroup, MenuDivider, useToast } from '@chakra-ui/react'
import MenuIcon from '@/components/icons/menuIcon'
import { Link } from './Link';
import useMenu, { MenuItemInterface } from '@/hooks/useMenu';

const Menu = () => {
    const items = useMenu();
    const toast = useToast();

    const getMenuItem = (item: MenuItemInterface, ml:number) => (
      item.label.startsWith("divider")
      ? <MenuDivider key={item.label}/>
      : item.children
        ? getSubMenu(item, ml)
        : <MenuItem key={item.label} ml={ml}>
            <Link
              href={item.url || undefined}
              onClick={item.action ? async () => {
                item.action && await item.action()
                item.actionMsg && toast({
                  title: item.actionMsg,
                  status: 'success',
                  duration: 3000
                }) 
              } : undefined}
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
    )

    const getSubMenu = (item: MenuItemInterface, ml:number) => (
      <MenuGroup title={item.label} key={item.label}>
        {item.children?.map((item) => getMenuItem(item, ml+3))}
      </MenuGroup>
    )
    
    return (
      <MenuChakra variant={'mainMenu'}>
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
        <MenuList
          borderWidth="0"
          position="absolute"
          left="-170px"
          top="15px"
          boxShadow="0px -5px 10px -15px rgb(0 0 0 / 10%), 0px 5px 10px 5px rgb(0 0 0 / 10%)"
        >
          {items?.map((item, key) => getMenuItem(item, 0))}
          <Box
            position="absolute"
            top="-14px"
            right="12px"
            width="30px"
            height="30px"
            backgroundColor="#fff"
            transform="rotate(45deg)"
            boxShadow="-5px -5px 10px -5px rgb(0 0 0 / 10%)"
          />
        </MenuList>
      </MenuChakra>
    );
}

export default Menu