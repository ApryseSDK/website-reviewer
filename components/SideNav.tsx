import { Box, Flex, Spacer, Text } from "@chakra-ui/layout";
import { Document } from "@pdftron/collab-client/types/types/resolvers-types";
import { useRouter } from "next/dist/client/router";
import { useContext, useEffect } from "react";
import CollabClient from "../context/CollabClient";
import UserContext from "../context/UserContext";
import useArrayState from "../hooks/useArrayState";
import NewFileModal from "./NewFileModal";
import ShareModal from "./ShareModal";

type SideNavProps = {
  documentId?: string
}

export default function SideNav({
  documentId
}: SideNavProps) {

  const { user } = useContext(UserContext);
  const client = useContext(CollabClient);
  const router = useRouter();

  const {
    items: documents,
    push: pushDocument,
    setItems: setDocuments,
    replaceItem: replaceDocument,
    sort: sortDocuments
  } = useArrayState<Document>();

  useEffect(() => {
    if (!client) return;
    (async () => {
      const { default: CollabClientClass } = await import('@pdftron/collab-client');
      const documents = await client.getAllDocuments();
      setDocuments(documents as Document[])


      return client.subscribe('documentChanged', (document, action) => {

        console.log('doc changed')

        if (action === CollabClientClass.ChangeEventTypes.ADD || action === CollabClientClass.ChangeEventTypes.INVITE) {
          pushDocument(document as Document)
        }

        if (action ===  CollabClientClass.ChangeEventTypes.EDIT) {
          replaceDocument((d) => {
            return d.id === document.id
          }, document as Document)
        }

        sortDocuments((d1, d2) => {
          return d2.updatedAt > d1.updatedAt ? 1 : -1
        })
      })
    })()
  }, [client])

  return (
    <Flex bg='blue.900' w='100%' h='100%' flexDir='column' p='10px'>

      <Box>
        {
          documents.map(document => {

            const active = document.id === documentId;
            return (
              <Flex
                key={document.id}
                p='5px 10px'
                mb='5px'
                cursor={active ? undefined : 'pointer'}
                onClick={active ? undefined : () => router.push(`/document/${document.id}`)}
                bg={active ? 'white' : 'transparent'}
                borderRadius='4px'
              >
                <Text color={active ? 'blue.900' : 'white'}>{document.name}</Text>
                <Spacer />
                {
                  document.unreadCount > 0 &&
                  <Box bg='red' px='10px' borderRadius='10px'>
                    <Text color='white' fontWeight='bold'>{document.unreadCount}</Text>
                  </Box>
                }
              </Flex>
            )
          })
        }
      </Box>

      <Spacer />
      
      {
        documentId && <ShareModal />
      }
      

      <NewFileModal />

      <Text
        color='white'
        fontSize='14px'
        textAlign='center'
        mt='10px'
      >
        {user.email}
      </Text>

    </Flex>
  )

}