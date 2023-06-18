import { Box, Divider, Flex, FormLabel, Heading, Input, FormControl, Stack, Button, Link as ChakraLink } from '@chakra-ui/react';
import React, { FC, memo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const Login: FC = memo(() => {
  const [show, setShow] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('登録');
  };
  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          ログイン
        </Heading>
        <Divider my={4} />
        <Box onSubmit={handleSubmit} as="form" px={10} pb={8}>
          <FormControl py={2} mb={4}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" placeholder="メールアドレス" />
          </FormControl>
          <FormControl py={2}>
            <FormLabel htmlFor="password">パスワード</FormLabel>
            <Input id="password" type={show ? 'text' : 'password'} placeholder="パスワード" />
          </FormControl>
          <Stack align="center" mt={5}>
            <Button type="submit" colorScheme="teal" size="md" w="100%">
              ログイン
            </Button>
          </Stack>
          <Flex justifyContent="flex-end" mt={2}>
            <ChakraLink as={RouterLink} to="/signup" color="black.500" fontSize="sm">ユーザ登録はこちら</ChakraLink>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
});
