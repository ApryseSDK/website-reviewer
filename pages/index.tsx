import { Box, Flex, ChakraProvider } from '@chakra-ui/react';
import WebViewer from '../components/WebViewer';

import SideNav from '../components/SideNav';

export default function Home() {


  return (
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
  )
}
