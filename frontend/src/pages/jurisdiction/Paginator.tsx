import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Text } from "@chakra-ui/react";

const Paginator = () => {
  return (
    <HStack padding="10px" justify="end">
      <Text>1 - 5 of 5000</Text>
      <IconButton
        aria-label="Back"
        icon={<ChevronLeftIcon />}
        backgroundColor="transparent"
      />
      <IconButton
        aria-label="Next"
        icon={<ChevronRightIcon />}
        backgroundColor="transparent"
      />
    </HStack>
  );
}

export default Paginator;