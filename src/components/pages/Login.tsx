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
  Spinner,
} from "@chakra-ui/react";
import React, { ChangeEvent, FC, memo, useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebase";
import { FormFrame } from "../parts/FormFrame";
import { useAuthState } from 'react-firebase-hooks/auth';
import { LoadingPage } from '../parts/LoadingPage';

export const Login: FC = memo(() => {
  const [show, setShow] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("ログイン時にエラーが発生しました。");
  const onChangeLoginEmail = (e: ChangeEvent<HTMLInputElement>) => setLoginEmail(e.target.value);
  const onChangeLoginPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginPassword(e.target.value);
  };
  const navigation = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user && user.emailVerified) {
      navigation("/dashboard");
    }
  }, [user, navigation]);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const user = userCredential.user;
      if (user) {
        await user.reload();
        if(!user.emailVerified) {
          throw new Error(`メールアドレスが認証されていません。
          メールアドレスに送信されたリンクをクリックしてください。`);
        }
      }
      setLoginEmail("");
      setLoginPassword("");
      navigation("/auth/logout/");
    } catch (error: any) {
      if ('code' in error && error.code === "auth/user-not-found") {
        setErrorMessage('ユーザーが見つかりません')
      } else if ('code' in error && error.code === "auth/invalid-email") {
        setErrorMessage('不正な形式のメールアドレスです')
      } else if ('code' in error && error.code === "auth/user-disabled") {
        setErrorMessage('このユーザーは無効にされています')
      } else if ('code' in error && error.code === "auth/wrong-password") {
        setErrorMessage('パスワードが間違っています')
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      }
      setShow(true);
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void handleSubmit(event);
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <FormFrame>
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
              {errorMessage}
            </Alert>
          )}

          <Heading as="h1" size="lg" textAlign="center">
            ログイン
          </Heading>
          <Divider my={4} />
          <Box onSubmit={onSubmit} as="form" px={10} pb={8}>
            <FormControl py={2} mb={4}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" placeholder="info@email.com" autoComplete='email' value={loginEmail} onChange={onChangeLoginEmail} />
            </FormControl>
            <FormControl py={2}>
              <FormLabel htmlFor="password">パスワード</FormLabel>
              <Input
                id="password"
                type={show ? "text" : "password"}
                placeholder="パスワード"
                value={loginPassword}
                autoComplete='password'
                onChange={onChangeLoginPassword}
              />
            </FormControl>
            <Stack align="center" mt={5}>
              <Button
                isDisabled={loginEmail === "" || loginPassword === ""}
                type="submit"
                colorScheme="teal"
                size="md"
                w="100%"
              >
                ログイン
              </Button>
            </Stack>
            <Flex flexDirection="column" alignItems="flex-end" rowGap={1} mt={8}>
              <ChakraLink as={RouterLink} to="/auth/signup/" color="black.500" fontSize="sm">
                ユーザ登録はこちら
              </ChakraLink>
              <ChakraLink as={RouterLink} to="/auth/reset-password/" color="black.500" fontSize="sm">
                パスワードを忘れた方はこちら
              </ChakraLink>
            </Flex>
          </Box>
        </FormFrame>
      )}
    </>
  );
});
