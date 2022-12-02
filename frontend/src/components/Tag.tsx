import { Flex } from "@chakra-ui/react";
import { ObjectHashInterface, TagInterface } from "@/interfaces/index";
import ChevronRightIcon from '@/components/icons/chevronRightIcon';

export default function Tag({ type = 'default', ...props }: TagInterface) {
    const tags: ObjectHashInterface = { default: 'brand.white', received: 'brand.white', made: 'brand.white', sellingMe: 'brand.lemon' }

    return (
        <Flex
            _hover={{
                padding:'6px 8px 8px 8px',
                border:'3px solid',
                borderColor: type === 'sellingMe' ? 'brand.grey04' : 'brand.javaHover',
            }}
            alignItems='center'
            boxShadow='0px 0px 15px rgba(0, 0, 0, 0.1)'
            borderRadius='8px'
            position='relative'
            justify='flex-start'
            direction='row'
            background={tags[type]}
            h={'40px'}
            width='100%'
            margin='0 0 10px 0'
            padding= {{base: '6px 6px 6px 6px', sm: '6px 6px 6px 6px', md: '8px 8px 8px 16px', lg: '8px 8px 8px 16px' }}
            {...props}>
            {props.children}
            <Flex position='absolute' right='0'>
                <ChevronRightIcon />
            </Flex>
        </Flex>
    );
}