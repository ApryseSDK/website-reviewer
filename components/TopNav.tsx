import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Spacer, Text } from '@chakra-ui/react';
import { Document } from '@pdftron/collab-client/types/types/resolvers-types';
import { useRouter } from 'next/dist/client/router';
import React, { useCallback, useContext } from 'react';
import CollabClient from '../context/CollabClient';
import WebViewer from '../context/WebViewer';

type TopNavProps = {
  document: Document
}

export default function TopNav({ document }: TopNavProps) {
  const client = useContext(CollabClient)
  const members = document?.members || [];
  const router = useRouter();

  const wv = useContext(WebViewer);

  const leave = useCallback(() => {
    if (client && document) {
      client.leaveDocument(document.id)
      
      if (router) {
        router.push('/document')
      }

      wv.instance.docViewer.closeDocument()
    }
  }, [document, client, router])

  return (
    <Flex w='100%' h='50px' bg='blue.500' alignItems='center' px='20px'>

      {
        document &&
        <Box>
          <Text color='white'>{document.name}</Text>
        </Box>
      }

      <Spacer />

      {
        document &&
        <Button onClick={leave} mr='10px'>Leave document</Button>
      }

      {
        members.length > 0 &&
        (
          <Menu>
            <MenuButton as={Button}>
              Members
            </MenuButton>
            <MenuList>
              {
                members.map(member => (
                  <MenuItem key={member.id}>{member.user.userName || member.user.email}</MenuItem>
                ))
              }
            </MenuList>
          </Menu>
        )
      }


    </Flex>
  )

}