import { useDisclosure } from "@chakra-ui/hooks"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Text
} from "@chakra-ui/react"
import { useRef } from "react"

export default function NewFileModal() {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const ref = useRef<HTMLInputElement>();

  const submit = () => {

    const value = ref.current.value;

    console.log(value)
  }

  return (
    <>
      <Button onClick={onOpen} bg='yellow' color='blue.900'>New file</Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Review a new website</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

            <Text pb='5px'>Enter the URL</Text>
            <Input ref={ref}/>
            <Button my='10px' bg='blue.500' color='white' onClick={submit} >Submit</Button>
          </ModalBody>

        </ModalContent>
      </Modal>
    </>

  )

}