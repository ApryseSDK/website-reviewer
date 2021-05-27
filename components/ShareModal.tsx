import { useClipboard, useDisclosure } from '@chakra-ui/hooks';
import { Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';


export default function ShareModal() {

  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setOrigin(window.location.origin);
  }, [])


  const { isOpen, onOpen, onClose } = useDisclosure();
  const {asPath} = useRouter();

  const { hasCopied, onCopy } = useClipboard(origin + asPath)

  return (
    <>
      <Button
        onClick={onOpen}
        mb='10px'
        bg='transparent'
        borderColor='yellow'
        borderStyle='solid'
        borderWidth='1px'
        color='yellow'
      >Share document</Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Share</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb='40px'>

            <Text mb='20px'>Send this URL to any people you want to share this document with</Text>

            <Flex>
              <Input value={origin + asPath} isReadOnly />
              <Button onClick={onCopy} ml={2}>
                {hasCopied ? "Copied" : "Copy"}
              </Button>
            </Flex>
            

          </ModalBody>

        </ModalContent>
      </Modal>
    </>
  )

}