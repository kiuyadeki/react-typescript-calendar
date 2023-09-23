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
} from "@chakra-ui/react";
import React, { ChangeEvent, FC, memo, useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebase";
import { useRecoilState } from "recoil";
import { userState } from "../../store/UserState";
import { FormFrame } from "../parts/FormFrame";

export const Login: FC = memo(() => {
  const [show, setShow] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const onChangeLoginEmail = (e: ChangeEvent<HTMLInputElement>) => setLoginEmail(e.target.value);
  const onChangeLoginPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginPassword(e.target.value);
  };
  const navigation = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      if (user) {
        setUserInfo({ isLogin: true });
      } else {
        setUserInfo({ isLogin: false });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log(userInfo.isLogin);
  }, [userInfo]);

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
      };
      await checkEmailVerification();
      setLoginEmail("");
      setLoginPassword("");
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
  );
});
