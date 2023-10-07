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
import { LoadingPage } from '../parts/LoadingPage';
import { useRecoilValue } from 'recoil';
import { loadingState, userState } from '../../recoil/AuthState';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '../../firebase';

type Props = {
  actionCode: string | null;
}

export const SetNewPassword: FC<Props> = memo((props) => {
  const [show, setShow] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState("ログイン時にエラーが発生しました。");
  const onChangenewPassword = (e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value);
  const navigation = useNavigate();
  const user = useRecoilValue(userState);
  const loading = useRecoilValue(loadingState);
  const {actionCode} = props;
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(actionCode) {
      verifyPasswordResetCode(auth, actionCode).then((email) => {
        const accountEmail = email;
        confirmPasswordReset(auth, actionCode, newPassword).then((resp) => {
          console.log('password changed');
        }).catch((error) => {
          console.log("confirmPasswordReset", error)
        })
      }).catch((error) => {
        setShow(true);
        setErrorMessage(error.message);
        console.log("verifyPasswordResetCode", error.message);
      })
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
        <>
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
            <FormControl py={2}>
              <FormLabel htmlFor="password">新しく設定するパスワードを入力してください。</FormLabel>
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
        </>
      )}
    </>
  );
});
