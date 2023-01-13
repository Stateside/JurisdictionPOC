import { Box, Flex } from '@chakra-ui/react';
import { ObjectHashInterface, TagInterface } from '@/interfaces/index';
import ChevronRightIcon from '@/components/icons/chevronRightIcon';

export default function Tag({
  type = 'default',
  caret,
  justify,
  information,
  ...props
}: TagInterface) {
  const tags: ObjectHashInterface = {
    default: 'brand.white',
    received: 'brand.white',
    made: 'brand.white',
    sellingMe: 'brand.white',
  };

  return (
    <Flex
      _hover={{
        // padding: '6px 8px 8px 8px',
        // border: '3px solid',
        boxShadow:
          'inset 0 0 0 3px var(--chakra-colors-brand-javaHover), 0px 0px 15px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        borderColor: type === 'sellingMe' ? 'brand.grey04' : 'brand.javaHover',
        backgroundColor: type === 'sellingMe' ? 'brand.lemon' : 'brand.white',
      }}
      alignItems="center"
      boxShadow="0px 0px 15px rgba(0, 0, 0, 0.1)"
      borderRadius="8px"
      position="relative"
      justify={justify || 'flex-start'}
      direction="row"
      background={tags[type]}
      h={'40px'}
      width="100%"
      margin="0 0 10px 0"
      padding={{
        base: '6px 6px 6px 6px',
        sm: '6px 6px 6px 6px',
        md: '8px 8px 8px 16px',
        lg: '8px 8px 8px 16px',
      }}
      {...props}
    >
      {props.children}
      {information && (
        <Box
          position="absolute"
          right={10}
          fontSize={12}
          pt={0.5}
          pb={0.5}
          pr={1}
          pl={1}
          borderRadius={10}
          backgroundColor="#D3D3D3"
        >
          Status
        </Box>
      )}
      <Flex position="absolute" right="2">
        {caret === null || <ChevronRightIcon />}
      </Flex>
    </Flex>
  );
}
