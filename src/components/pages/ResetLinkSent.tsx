import { memo, FC } from "react";
import { Box, Heading, Text, Divider, Stack, Flex } from "@chakra-ui/react";

export const ResetLinkSent: FC = memo(() => {
  return (
    <Flex align="center" justify="center" height="100vh" position="relative">
      <Box bg="white" w="lg" p={8} borderRadius="md" shadow="md" position="relative">
            <Heading as="h1" size="lg" textAlign="center" mb={2}>
              メールを送信しました。
            </Heading>
        <Divider my={4} />
        <Box px={10} pb={8}>
          <Stack spacing={1} pt={4}>
            <Text>
              パスワード再設定ページのリンクを記載したメールを送信しております。URLにアクセスしパスワードを再設定してください。
              <br />
              認証が完了しない場合、登録が完了しません。
              もしもメールが見当たらない場合は、再度手続きしてください。
            </Text>
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
});
