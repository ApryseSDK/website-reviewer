import { Box, Flex, ChakraProvider } from '@chakra-ui/react';
import WebViewer from '../../components/WebViewer';

import SideNav from '../../components/SideNav';
import { useRouter } from 'next/dist/client/router';
import { useContext, useEffect } from 'react';
import CollabClient from '../../context/CollabClient';
import WebViewerHTML from '../../context/WebViewerHTML';
import WebViewerContext from '../../context/WebViewer';

export default function Home() {
  const router = useRouter()
  const { documentid: documentId } = router.query;
  const client = useContext(CollabClient)
  const htmlInstance = useContext(WebViewerHTML);
  const {instance} = useContext(WebViewerContext)

  useEffect(() => {
    if (client && documentId && htmlInstance) {

      // access to async
      (async () => {
        const result = await fetch(`${process.env.NEXT_PUBLIC_DOCUMENT_API_BASE_URL}/metadata?id=${documentId}`)
        const json = await result.json();

        const {
          width, height, url
        } = json;

        instance.docViewer.one('annotationsLoaded', () => {
          instance.docViewer.zoomTo(1)
          client.loadSession(documentId[0] as string)
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
          <SideNav documentId={documentId as string} />
        </Box>
        <Box flexGrow={1} h='100%'>
          <WebViewer />
        </Box>
      </Flex>
    </Box>
  )
}
