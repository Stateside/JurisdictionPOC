import DeleteIcon from "@/components/icons/deleteIcon";
import { Button, HStack, Input } from "@chakra-ui/react"

const Revision = () => {
  return (
    <HStack width="80%" gap="20px">
      <Input backgroundColor="#ffffff" />
      <Button rightIcon={<DeleteIcon height={7} width={7} />}>Remove</Button>
    </HStack>
  );
}

export default Revision