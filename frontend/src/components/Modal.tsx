import {
    VStack,
    HStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    Text
  } from "@chakra-ui/react";
  import { Image } from "@chakra-ui/react";
  import { useWeb3React } from "@web3-react/core";
  import { setProvider } from '@/utils/util'
  import { connectors } from "@/connectors/index";
  
  export default function SelectWalletModal({ isOpen, closeModal }:{isOpen:any, closeModal:any}) {
    const { activate } = useWeb3React();
    
    return (
      <Modal isOpen={isOpen} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent w="300px">
          <ModalHeader>Select Wallet</ModalHeader>
          <ModalCloseButton
            _focus={{
              boxShadow: "none"
            }}
          />
          <ModalBody paddingBottom="1.5rem">
            <VStack>
              <Button
                variant="outline"
                onClick={() => {
                  activate(connectors.injected);
                  setProvider("injected");
                  closeModal();
                }}
                w="100%"
              >
                <HStack w="100%" justifyContent="center">
                  <Image
                    src="/imgs/mm.png"
                    alt="Metamask Logo"
                    width={25}
                    height={25}
                    borderRadius="3px"
                  />
                  <Text>Metamask</Text>
                </HStack>
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }