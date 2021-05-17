import { Box, Flex, Spacer, Text } from "@chakra-ui/layout";
import { Document } from "@pdftron/collab-client/types/types/resolvers-types";
import { useRouter } from "next/dist/client/router";
import { useContext, useEffect } from "react";
import CollabClient from "../context/CollabClient";
import UserContext from "../context/UserContext";
import useArrayState from "../hooks/useArrayState";
import NewFileModal from "./NewFileModal";

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
    setItems: setDocuments
  } = useArrayState<Document>();

  useEffect(() => {
    
  }, [documentId])

  useEffect(() => {
    if (!client) return;
    (async () => {
      const { default: CollabClientClass } = await import('@pdftron/collab-client');
      const documents = await client.getAllDocuments();
      setDocuments(documents as Document[])


      client.subscribe('documentChanged', (document, action) => {
        if (action === CollabClientClass.ChangeEventTypes.ADD) {
          pushDocument(document as Document)
        }
      })
    })()
  }, [client])

  return (
    <Flex bg='blue.900' w='100%' h='100%' flexDir='column' p='10px'>

      <Box>
        {
          documents.map(document => {
            return (
              <Box
                key={document.id}
                p='10px'
                cursor='pointer'
                onClick={() => router.push(`/document/${document.id}`)}
              >
                <Text color='white'>{document.name}</Text>
              </Box>
            )
          })
        }
      </Box>

      <Spacer />
      
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