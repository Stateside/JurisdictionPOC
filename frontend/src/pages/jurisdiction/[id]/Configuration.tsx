import { Button, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import EditIcon from '@/components/icons/editIcon';

const Configuration = () => {
  return (
    <VStack width="100%">
      <HStack
        height="60px"
        width="100%"
        alignContent="flex-end"
        justifyContent="flex-start"
      >
        <Text width="20%">Jurisdiction name:</Text>
        <Text width="70%">Costa Rica</Text>
        <Button rightIcon={<EditIcon width={6} height={6} />} variant="Clear">
          Change
        </Button>
      </HStack>
      <Divider />
      <HStack
        height="60px"
        width="100%"
        alignContent="flex-end"
        justifyContent="flex-start"
      >
        <Text width="20%">Jurisdiction contract:</Text>
        <Text width="70%">0x12908120187239183</Text>
        <Button rightIcon={<EditIcon width={6} height={6} />} variant="Clear">
          Change
        </Button>
      </HStack>
      <Divider />
      <HStack
        height="60px"
        width="100%"
        alignContent="flex-end"
        justifyContent="flex-start"
      >
        <Text width="20%">Title Token Name:</Text>
        <Text width="70%">CR Properties</Text>
        <Button rightIcon={<EditIcon width={6} height={6} />} variant="Clear">
          Change
        </Button>
      </HStack>
      <Divider />
      <HStack
        height="60px"
        width="100%"
        alignContent="flex-end"
        justifyContent="flex-start"
      >
        <Text width="20%">Title Token Symbol:</Text>
        <Text width="70%">CRP</Text>
        <Button rightIcon={<EditIcon width={6} height={6} />} variant="Clear">
          Change
        </Button>
      </HStack>
      <Divider />
      <HStack
        height="60px"
        width="100%"
        alignContent="flex-end"
        justifyContent="flex-start"
      >
        <Text width="20%">Title Token URI:</Text>
        <Text width="70%">
          https://jurisdictions.stateside.agency/api/tokens/
        </Text>
        <Button rightIcon={<EditIcon width={6} height={6} />} variant="Clear">
          Change
        </Button>
      </HStack>
      <Divider />
      <HStack
        height="60px"
        width="100%"
        alignContent="flex-end"
        justifyContent="flex-start"
      >
        <Text width="20%">Registry Account:</Text>
        <Text width="70%">George 0x201201091820371928</Text>
        <Button rightIcon={<EditIcon width={6} height={6} />} variant="Clear">
          Change
        </Button>
      </HStack>
      <Divider />
      <HStack
        height="60px"
        width="100%"
        alignContent="flex-end"
        justifyContent="flex-start"
      >
        <Text width="20%">Maintenance Account: </Text>
        <Text width="70%">Ana 0x102091209127198279128</Text>
        <Button rightIcon={<EditIcon width={6} height={6} />} variant="Clear">
          Change
        </Button>
      </HStack>
      <Divider />
      <HStack
        height="60px"
        width="100%"
        alignContent="flex-end"
        justifyContent="flex-start"
      >
        <Text width="20%">Registry Fee:</Text>
        <Text width="70%">$15</Text>
        <Button rightIcon={<EditIcon width={6} height={6} />} variant="Clear">
          Change
        </Button>
      </HStack>
      <Divider />
      <HStack
        height="60px"
        width="100%"
        alignContent="flex-end"
        justifyContent="flex-start"
      >
        <Text width="20%">Maintenance Fee:</Text>
        <Text width="70%">$10</Text>
        <Button rightIcon={<EditIcon width={6} height={6} />} variant="Clear">
          Change
        </Button>
      </HStack>
      <Divider />
      <HStack
        height="60px"
        width="100%"
        alignContent="flex-end"
        justifyContent="flex-start"
      >
        <Text width="20%">Enable NFT Support:</Text>
        <Text width="70%">Enabled</Text>
        <Button rightIcon={<EditIcon width={6} height={6} />} variant="Clear">
          Change
        </Button>
      </HStack>
      <Divider />
    </VStack>
  );
}

export default Configuration;