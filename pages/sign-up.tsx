import { Button } from "@chakra-ui/button";
import { useBoolean } from "@chakra-ui/hooks";
import { FormControl, FormLabel, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Box, Center, Heading, Link, Text } from "@chakra-ui/layout"
import { useRouter } from "next/dist/client/router";
import { useCallback, useContext, useRef, useState } from "react";
import Card from '../components/Card';
import CollabClient from "../context/CollabClient";
import UserContext from "../context/UserContext";

export default function SignUp ()  {

  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const nameRef = useRef<HTMLInputElement>();

  const [loading, setLoading] = useBoolean(false);
  const [error, setError] = useState<string>();
  const router = useRouter();
  const client = useContext(CollabClient);
  const [show, setShow] = useState(false);

  const { setUser } = useContext(UserContext);

  const login = useCallback(async () => {

    setLoading.on();
    setError('');

    const body = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      username: nameRef.current.value
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/sign-up`, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': "application/json"
      }
    })

    if (response.status === 422) {
      setError('A user with the given email already exists');
      setLoading.off();
      return;
    }

    const result = await response.json();

    setUser(result.user);
    await client.loginWithToken(result.token);
    router.push('/');
  }, [client])


  return (
    <Center h='100%'>
      <Card p='20px'>
        <Heading textAlign='center'>Sign up</Heading>

        <Box my='40px'>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input type='email' autoComplete='email' ref={emailRef} />
          </FormControl>

          <FormControl>
            <FormLabel mt='20px'>Display name</FormLabel>
            <Input autoComplete='username' ref={nameRef} />
          </FormControl>

          <FormControl>
            <FormLabel mt='20px'>Password</FormLabel>
            <InputGroup>
              <Input ref={passwordRef} type={show ? "text" : "password"} />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

         
        </Box>

        <Center flexDir='column'>
          <Button
            w='100%'
            bg='blue.500'
            color='white'
            onClick={login}
            isLoading={loading}
          >
            Sign up
          </Button>

          {
            error &&
            <Text fontSize='12px' color='error' mt='10px'>{error}</Text>
          }

          <Text mt='30px' fontSize='14px'>Have an account? <Link href='/login'>Login</Link></Text>
        </Center>

        
        
      </Card>
    </Center>
  )
}