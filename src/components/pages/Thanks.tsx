import React, { memo, FC } from "react";
import { Box, Heading, Text, Divider, Stack, Flex } from "@chakra-ui/react";

export const Thanks: FC = memo(() => {
  return (
    <Flex align="center" justify="center" height="100vh" position="relative">
      <Box bg="white" w="lg" p={8} borderRadius="md" shadow="md" position="relative">
            <Heading as="h1" size="lg" textAlign="center" mb={2}>
              認証メールを送信しました。認証を完了させましょう！
            </Heading>
        <Divider my={4} />
        <Box px={10} pb={8}>
          <Stack spacing={1} pt={4}>
            <Text>
              認証用のURLを記載したメールを送信しております。URLにアクセスしメール認証を完了させてください。
              <br />
              認証が完了しない場合、登録が完了しません。
              もしもメールが見当たらない場合は、以下のリンクより認証用のURLを再送信してください。
            </Text>
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
});
