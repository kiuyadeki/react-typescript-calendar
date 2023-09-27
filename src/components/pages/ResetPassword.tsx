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
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { FormFrame } from "../parts/FormFrame";
import { useAuthState } from 'react-firebase-hooks/auth';
import { LoadingPage } from '../parts/LoadingPage';

export const ResetPassword: FC = memo(() => {
  const [show, setShow] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("不明なエラーです。メールを送信できませんでした。");
  const onChangeLoginEmail = (e: ChangeEvent<HTMLInputElement>) => setLoginEmail(e.target.value);
  const navigation = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if(user && user.emailVerified) {
      navigation("/dashboard/");
    }
  }, [user, navigation]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const actionCodeSettings = {
      url: "/login",
      handleCodeInApp: false,
    };
    sendPasswordResetEmail(auth, loginEmail)
      .then(resp => {
        console.log("送信成功");
        setLoginEmail("");
        navigation("/auth/reset-link-sent/");
      })
      .catch(error => {
        if ("code" in error && error.code === "auth/user-not-found") {
          setErrorMessage("ユーザーが見つかりません");
        } else if ("code" in error && error.code === "auth/invalid-email") {
          setErrorMessage("不正な形式のメールアドレスです");
        } else if ("code" in error && error.code === "auth/user-disabled") {
          setErrorMessage("このユーザーは無効にされています");
        }
        console.log(error.message);
        setShow(true);
      });
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
          パスワード再設定
        </Heading>
        <Divider my={4} />
        <Box onSubmit={onSubmit} as="form" px={10} pb={8}>
          <FormControl py={2} mb={4}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" placeholder="info@email.com" value={loginEmail} onChange={onChangeLoginEmail} />
          </FormControl>
          <Stack align="center" mt={5}>
            <Button isDisabled={loginEmail === ""} type="submit" colorScheme="teal" size="md" w="100%">
              再設定用のリンクを送信
            </Button>
          </Stack>
        </Box>
        <Flex flexDirection="column" alignItems="flex-end" rowGap={1} mt={8}>
          <ChakraLink as={RouterLink} to="/auth/signup/" color="brack.500" fontSize="sm">
            ユーザ登録はこちら
          </ChakraLink>
        </Flex>
      </FormFrame>
      )}
    </>
  );
});
