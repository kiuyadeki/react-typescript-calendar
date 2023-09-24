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
import React, { ChangeEvent, FC, memo, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";

export const ResetPassword: FC = memo(() => {
  const [show, setShow] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const onChangeLoginEmail = (e: ChangeEvent<HTMLInputElement>) => setLoginEmail(e.target.value);
  const navigation = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const actionCodeSettings = {
      url: '/login',
      handleCodeInApp: false,
    }
    sendPasswordResetEmail(auth, loginEmail)
    .then((resp) => {
      console.log('送信成功');
      setLoginEmail("");
      navigation("/auth/logout/");
    })
    .catch((error) => {
      console.log(error.message);
      setShow(true);
    })
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
            パスワード再設定
          </Heading>
          <Divider my={4} />
          <Box onSubmit={onSubmit} as="form" px={10} pb={8}>
            <FormControl py={2} mb={4}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" placeholder="info@email.com" value={loginEmail} onChange={onChangeLoginEmail} />
            </FormControl>
            <Stack align="center" mt={5}>
              <Button
                isDisabled={loginEmail === ""}
                type="submit"
                colorScheme="teal"
                size="md"
                w="100%"
              >
                再設定用のリンクを送信
              </Button>
            </Stack>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
});
