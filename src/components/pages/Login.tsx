import {
  Box,
  Divider,
  Flex,
  FormLabel,
  Heading,
  Input,
  FormControl,
  Stack,
  Button,
  Link as ChakraLink,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import React, {
  ChangeEvent, FC, memo, useState,
} from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

export const Login: FC = memo(() => {
  const [show, setShow] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const onChangeLoginEmail = (e: ChangeEvent<HTMLInputElement>) => setLoginEmail(e.target.value);
  const onChangeLoginPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginPassword(e.target.value);
  };
  const navigation = useNavigate();

  auth.onAuthStateChanged((user) => {
    if (!user) {
      console.log("サインインしていない状態");
    } else {
      console.log("サインイン済み");
    }
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const user = userCredential.user;

      const checkEmailVerification = async () => {
        if (user) {
          await user.reload();
          console.log(user);
          console.log("is email verified?", user.emailVerified);
        }
      }
      await checkEmailVerification();
      setLoginEmail('');
      setLoginPassword('');
      navigation("/logout/");

    } catch (error) {
      setShow(true);
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void handleSubmit(event);
  };

  return (
    <Box>
      <Flex align="center" justify="center" height="100vh" position="relative">
        <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md" position="relative">
          {show && (
            <Alert
              status="error"
              textAlign="center"
              position="absolute"
              top="0"
              left="0"
              transform="translateY(-120%)"
              borderRadius="md"
            >
              <AlertIcon />
              There was an error processing your request
            </Alert>
          )}

          <Heading as="h1" size="lg" textAlign="center">
            ログイン
          </Heading>
          <Divider my={4} />
          <Box onSubmit={onSubmit} as="form" px={10} pb={8}>
            <FormControl py={2} mb={4}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" placeholder="メールアドレス" value={loginEmail} onChange={onChangeLoginEmail} />
            </FormControl>
            <FormControl py={2}>
              <FormLabel htmlFor="password">パスワード</FormLabel>
              <Input
                id="password"
                type={show ? 'text' : 'password'}
                placeholder="パスワード"
                value={loginPassword}
                onChange={onChangeLoginPassword}
              />
            </FormControl>
            <Stack align="center" mt={5}>
              <Button
                isDisabled={loginEmail === '' || loginPassword === ''}
                type="submit"
                colorScheme="teal"
                size="md"
                w="100%"
              >
                ログイン
              </Button>
            </Stack>
            <Flex justifyContent="flex-end" mt={2}>
              <ChakraLink as={RouterLink} to="/signup" color="black.500" fontSize="sm">
                ユーザ登録はこちら
              </ChakraLink>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
});
