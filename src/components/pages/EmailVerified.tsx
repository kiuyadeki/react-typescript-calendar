import { memo, FC } from "react";
import { Box, Heading, Text, Divider, Stack, Flex, Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink } from 'react-router-dom';

export const EmailVerified: FC = memo(() => {
  return (
    <>
      <Heading as="h1" size="lg" textAlign="center" mb={2}>
        メールアドレス認証が完了しました
      </Heading>
      <Divider my={4} />
      <Box px={10} pb={8}>
        <Stack spacing={1} pt={4}>
          <Text size="md">
            以下よりログインして予定を作成しましょう！
            <br />
          </Text>
          <ChakraLink as={ReactRouterLink} color="purple.700" to="/">
            ログイン画面へ
          </ChakraLink>
        </Stack>
      </Box>
    </>
  );
});
