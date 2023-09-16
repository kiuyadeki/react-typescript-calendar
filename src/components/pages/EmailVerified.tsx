import React, { memo, FC } from "react";
import { Box, Heading, Text, Divider, Stack, Flex, Link as ChakraLink } from "@chakra-ui/react";
import { Link  as ReactRouterLink } from 'react-router-dom';
import { applyActionCode } from 'firebase/auth';
import { auth } from '../../firebase';

export const EmailVerified: FC = memo(() => {
  function getParameterByName(name: string) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  function handleVerifyEmail(auth: any, actionCode: string) {
    applyActionCode(auth, actionCode).then((resp) => {
      console.log('your email has verified');
    }).catch((error) => {
      console.log('Code is invalid or expired :', error);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const mode = getParameterByName('mode');
    const actionCode = getParameterByName('oobCode');
    switch (mode) {
      case 'resetPassword' :
      break;
      case 'recoverEmail' :
      break;
      case 'verifyEmail' :
        handleVerifyEmail(auth, actionCode)
      break;
      default:
    }
  });


  return (
    <Flex align="center" justify="center" height="100vh" position="relative">
      <Box bg="white" w="xl" p={8} borderRadius="md" shadow="md" position="relative">
            <Heading as="h1" size="lg" textAlign="center" mb={2}>
              メールアドレス認証が完了しました
            </Heading>
        <Divider my={4} />
        <Box px={10} pb={8}>
          <Stack spacing={1} pt={4}>
            <Text size="md">
              以下よりログインして予定を作成しましょう！<br />
            </Text>
            <ChakraLink as={ReactRouterLink} color="purple.700" to="/">ログイン画面へ</ChakraLink>
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
});
