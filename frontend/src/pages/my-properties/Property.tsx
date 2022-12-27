import RealStateAgentIcon from "@/components/icons/realStateAgentIcon";
import Tag from "@/components/Tag";
import { HStack, Text } from "@chakra-ui/react";

const Property = () => {
  return (
    <Tag>
      <HStack width="100%">
        {/* Name */}
        <Text style={{ flexGrow: 1 }} variant={'15/20'}>
          001 - 456 - 87654 - E
        </Text>
        {/* Activity */}
        <Text style={{ flexGrow: 1 }} variant={'15/20'}>
          <RealStateAgentIcon height={5} width={5} /> Selling for <b>78 ETH</b>
        </Text>
      </HStack>
    </Tag>
  );
}

export default Property;