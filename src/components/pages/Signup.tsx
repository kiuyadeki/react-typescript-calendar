import { Box, Divider, Flex, FormLabel, Heading, Input, FormControl, Stack, Button } from '@chakra-ui/react';
import { FC, memo, useState } from 'react';

export const SignUp: FC = memo(() => {
  const [show, setShow] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('登録');
  };
  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          ユーザー登録
        </Heading>
        <Divider my={4} />
        <Box px={10} pb={8}>
          <form onSubmit={handleSubmit}>
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
                登録
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
    </Flex>
  );
});
