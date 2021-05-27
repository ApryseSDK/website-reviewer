import { Button } from "@chakra-ui/button";
import { useBoolean } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Center, Heading, Link, Text } from "@chakra-ui/layout"
import { useRouter } from "next/dist/client/router";
import { useCallback, useContext, useRef, useState } from "react";
import Card from '../components/Card';
import CollabClient from "../context/CollabClient";
import UserContext from "../context/UserContext";

export default function Login ()  {

  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const [loading, setLoading] = useBoolean(false);
  const [error, setError] = useState<string>();
  const router = useRouter();
  const client = useContext(CollabClient);

  const { setUser } = useContext(UserContext);

  const next = router.query?.next;

  const login = useCallback(async () => {

    setLoading.on();
    setError('');

    const body = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/login`, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': "application/json"
      }
    })

    if (response.status === 401) {
      setError('Invalid username or password');
      setLoading.off();
      return;
    }

    const result = await response.json();

    setUser(result.user);
    await client.loginWithToken(result.token);
    router.push(next ? next as string : '/');
  }, [client])


  return (
    <Center h='100%'>
      <Card p='20px'>
        <Heading textAlign='center'>Login</Heading>

        <Box my='40px'>
          <Text>Email</Text>
          <Input ref={emailRef} />

          <Text mt='20px'>Password</Text>
          <Input ref={passwordRef} type='password' />
        </Box>

        <Center flexDir='column'>
          <Button
            w='100%'
            bg='blue.500'
            color='white'
            onClick={login}
            isLoading={loading}
          >
            Log in
          </Button>

          {
            error &&
            <Text fontSize='12px' color='error' mt='10px'>{error}</Text>
          }

          <Text mt='30px' fontSize='14px'>Don't have an account? <Link href='/sign-up'>Sign up</Link></Text>
        </Center>

        
        
      </Card>
    </Center>
  )
}