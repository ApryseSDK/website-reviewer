import { Box, Flex, ChakraProvider, HStack, VStack } from '@chakra-ui/react';
import WebViewer from '../../components/WebViewer';

import SideNav from '../../components/SideNav';
import { useRouter } from 'next/dist/client/router';
import { useContext, useEffect, useState } from 'react';
import CollabClient from '../../context/CollabClient';
import WebViewerHTML from '../../context/WebViewerHTML';
import WebViewerContext from '../../context/WebViewer';
import { Document } from '@pdftron/collab-server/types/types/resolvers-types';
import TopNav from '../../components/TopNav';

export default function Home() {
  const router = useRouter()
  const { documentid: documentId } = router.query;
  const client = useContext(CollabClient)
  const htmlInstance = useContext(WebViewerHTML);
  const { instance } = useContext(WebViewerContext)
  
  const [document, setDocument] = useState<Document>(null);

  useEffect(() => {
    if (client && documentId && htmlInstance) {

      // access to async
      (async () => {
        const result = await fetch(`${process.env.NEXT_PUBLIC_DOCUMENT_API_BASE_URL}/metadata?id=${documentId}`)
        const json = await result.json();

        const {
          width, height, url
        } = json;

        instance.docViewer.one('annotationsLoaded', async () => {
          instance.docViewer.zoomTo(1)
          const doc = await client.loadSession(documentId[0] as string)
          if (doc && doc.isPublic) {
            await client.joinDocument(doc.id);
          }

          (doc && setDocument(doc as Document));
        })

        htmlInstance.loadHTMLPage({
          url,
          width,
          height
        });
      })()
    }
   
  }, [documentId, client, htmlInstance])

  return (
    <Box w='100vw' h='100vh'>
      <Flex h='100%'>
        <Box w='200px'>
          <SideNav documentId={documentId?.[0] as string} />
        </Box>
        <VStack flexGrow={1} h='100%'>
          <TopNav document={document} />
          <Box flexGrow={1} w='100%'>
            <WebViewer />
          </Box>
        </VStack>
      </Flex>
    </Box>
  )
}
