import {
  Button,
  Divider,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  Text,
  Textarea,
} from '@chakra-ui/react';

const AddRevisionModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: any }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack alignItems="flex-start" padding="20px 0" width="100%">
              <Text width="25%">Jurisdiction Name:</Text>
              <Text>Costa Rica</Text>
            </HStack>
            <Divider />
            <HStack alignItems="flex-start" padding="20px 0" width="100%">
              <Text width="25%">Contract Name:</Text>
              <Select width="75%" placeholder="Select option">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </HStack>
            <Divider />
            <HStack alignItems="flex-start" padding="20px 0" width="100%">
              <Text width="25%">Revision Name:</Text>
              <Select width="75%" placeholder="Select option">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </HStack>
            <Divider />
            <HStack alignItems="flex-start" padding="20px 0" width="100%">
              <Text width="25%">Description:</Text>
              <Textarea width="75%" />
            </HStack>
            <Divider />
            <HStack alignItems="flex-start" padding="20px 0" width="100%">
              <Text width="25%">Parameters:</Text>
            </HStack>
            <Divider />
          </ModalBody>

          <ModalFooter>
            <Button variant="Header" onClick={onClose}>Create Revision</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddRevisionModal;