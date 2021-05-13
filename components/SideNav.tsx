import { Flex, Spacer } from "@chakra-ui/layout";
import NewFileModal from "./NewFileModal";


export default function SideNav() {

  return (
    <Flex bg='blue.900' w='100%' h='100%' flexDir='column' p='10px'>

      <Spacer />
      
      <NewFileModal />

    </Flex>
  )

}