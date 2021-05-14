import { Box, Flex, ChakraProvider } from '@chakra-ui/react';
import WebViewer from '../../components/WebViewer';

import SideNav from '../../components/SideNav';
import { useRouter } from 'next/dist/client/router';

export default function Home() {
  const router = useRouter()
  const { documentid } = router.query

  return (
    <Box w='100vw' h='100vh'>
      <Flex h='100%'>
        <Box w='200px'>
          <SideNav documentId={documentid as string} />
        </Box>
        <Box flexGrow={1} h='100%'>
          <WebViewer />
        </Box>
      </Flex>
    </Box>
  )
}
