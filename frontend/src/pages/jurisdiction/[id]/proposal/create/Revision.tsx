import DeleteIcon from "@/components/icons/deleteIcon";
import { Button, HStack, Input } from "@chakra-ui/react"

const Revision = () => {
  return (
    <HStack width="100%" gap="20px">
      <Input />
      <Button rightIcon={<DeleteIcon height={7} width={7} />}>Remove</Button>
    </HStack>
  );
}

export default Revision