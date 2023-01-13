import DeleteIcon from "@/components/icons/deleteIcon";
import { Button, HStack, Input } from "@chakra-ui/react"

const Revision = () => {
  return (
    <HStack width="80%" gap="20px">
      <Input backgroundColor="#ffffff" />
      <Button
        backgroundColor="#D3D3D3"
        padding="0 30px 0 30px"
        rightIcon={<DeleteIcon height={7} width={7} />}
      >
        Remove
      </Button>
    </HStack>
  );
}

export default Revision