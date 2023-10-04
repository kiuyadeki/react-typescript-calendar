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
  SlideFade,
} from "@chakra-ui/react";
import React, { ChangeEvent, FC, memo, useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebase";
import { FormFrame } from "../parts/FormFrame";
import { LoadingPage } from '../parts/LoadingPage';
import { useRecoilValue } from 'recoil';
import { loadingState, userState } from '../../recoil/AuthState';

export const SetNewPassword: FC = memo(() => {
  const [show, setShow] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState("ログイン時にエラーが発生しました。");
  const onChangenewPassword = (e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value);
  const navigation = useNavigate();
  const user = useRecoilValue(userState);
  const loading = useRecoilValue(loadingState)
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
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
          <SlideFade in={show} offsetY="20px">
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
          </SlideFade>
          <Heading as="h1" size="lg" textAlign="center">
            ログイン
          </Heading>
          <Divider my={4} />
          <Box onSubmit={onSubmit} as="form" px={10} pb={8}>
            <FormControl py={2}>
              <FormLabel htmlFor="password">パスワード</FormLabel>
              <Input
                id="password"
                type={show ? "text" : "password"}
                placeholder="パスワード"
                value={newPassword}
                autoComplete='password'
                onChange={onChangenewPassword}
              />
            </FormControl>
            <Stack align="center" mt={5}>
              <Button
                isDisabled={newPassword === ""}
                type="submit"
                colorScheme="teal"
                size="md"
                w="100%"
              >
                ログイン
              </Button>
            </Stack>
          </Box>
        </FormFrame>
      )}
    </>
  );
});
