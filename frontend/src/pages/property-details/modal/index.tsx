import { ReactNode, useContext } from 'react';
import { Box } from '@chakra-ui/layout';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { PropertyDetailsContext } from '../PropertyDetailsContext';

type PropertyDetailsModal = {
  modalHeader: ReactNode;
  modalBody: ReactNode;
  modalFooter: ReactNode;
};

export default function PropertyDetailsModal({
  modalHeader,
  modalBody,
  modalFooter,
}: PropertyDetailsModal) {
  const { isOpen, onClose } = useContext(PropertyDetailsContext);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="container.lg" p={30}>
        <ModalHeader p={{ base: '16px 0' }}>
          <Box as="span" fontWeight="400" fontSize={{ base: '60px' }}>
            {modalHeader}
          </Box>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          borderTop="1px solid"
          borderBottom="1px solid"
          borderColor={'brand.grey.grey02'}
          p="0"
        >
          {modalBody}
        </ModalBody>
        <ModalFooter p={{ base: '16px 0' }}>{modalFooter}</ModalFooter>
      </ModalContent>
    </Modal>
  );
}
