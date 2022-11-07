import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Text, useDisclosure } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

export enum Color {
    Red,
    Green,
    Blue
}

interface ColorInputProps {
    title:string, 
    text:string, 
    isOpen:boolean, 
    onClose:()=>void,
    onConfirm:(val:Color)=>void,
}
 
const ColorInput = (props:ColorInputProps) => {
    const [value, setValue] = useState<Color|undefined>(undefined)
    const handleChange = (e:ChangeEvent<HTMLSelectElement>) => {
        setValue(Color[e.target.value as keyof typeof Color])
    }

    const onClose = () => {
        props.onClose();
    }
    const onConfirm = () => {
        props.onClose();
        props.onConfirm(value||Color.Red);
    }

    return (
        <Modal isOpen={props.isOpen} onClose={onClose}>
            <ModalOverlay 
                bg='blackAlpha.300'
                backdropFilter='blur(3px) hue-rotate(90deg)' />
            <ModalContent>
            <ModalHeader>{props.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Select placeholder={props.text} onChange={handleChange}>
                    <option value='Red'>Red</option>
                    <option value='Green'>Green</option>
                    <option value='Blue'>Blue</option>
                </Select>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onConfirm} disabled={value===undefined}>
                    OK
                </Button>
                <Button variant='ghost' mr={3} onClick={onClose}>
                    Cancel
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ColorInput;