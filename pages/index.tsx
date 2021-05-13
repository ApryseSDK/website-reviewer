import { Box, Flex } from '@chakra-ui/react';
import WebViewer from '../components/WebViewer';
import { ChakraProvider } from "@chakra-ui/react"
import theme from '../theme';
import SideNav from '../components/SideNav';
import type CollabClientType from '@pdftron/collab-client';

import CollabClientContext from '../context/CollabClient';
import { useEffect, useState } from 'react';


export default function Home() {

  const [collabClient, setCollabClient] = useState<CollabClientType>()

  useEffect(() => {
    // IIFE for access to async
    (async () => {
      const { default: CollabClient } = await import('@pdftron/collab-client')
      const client = new CollabClient({
        url: process.env.NEXT_PUBLIC_SERVER_URL,
        subscriptionUrl: process.env.NEXT_PUBLIC_SUBSCRIPTION_URL
      });
      setCollabClient(client)
    })()
    
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <CollabClientContext.Provider value={collabClient}>
        <Box w='100vw' h='100vh'>
          <Flex h='100%'>
            <Box w='200px'>
              <SideNav />
            </Box>
            <Box flexGrow={1} h='100%'>
              <WebViewer />
            </Box>
          </Flex>
        </Box>
      </CollabClientContext.Provider>
    </ChakraProvider>

  )
}
