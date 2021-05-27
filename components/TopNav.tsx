import { Box, Flex, Text } from '@chakra-ui/react';
import { Document } from '@pdftron/collab-client/types/types/resolvers-types';
import React from 'react';

type TopNavProps = {
  document: Document
}

export default function TopNav({ document }: TopNavProps) {

  return (
    <Flex w='100%' h='50px' bg='blue.500' alignItems='center' px='20px'>

      {
        document &&
        <Box>
          <Text color='white'>{document.name}</Text>
        </Box>
      }

    </Flex>
  )

}