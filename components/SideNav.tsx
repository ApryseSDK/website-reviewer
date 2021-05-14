import { Flex, Spacer, Text } from "@chakra-ui/layout";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import NewFileModal from "./NewFileModal";


export default function SideNav() {

  const { user } = useContext(UserContext);

  return (
    <Flex bg='blue.900' w='100%' h='100%' flexDir='column' p='10px'>

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