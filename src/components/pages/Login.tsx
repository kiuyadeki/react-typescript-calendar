import {
  Box, Divider, Flex, Heading, Input, Stack, Text,
} from '@chakra-ui/react';
import {
  ChangeEvent, FC, FormEvent, memo, useState,
} from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { PrimaryButton } from '../atoms/button/PrimaryButton';
import { useAuth } from '../../hooks/useAuth';
import { auth } from '../../firebase';

export const Login: FC = memo(() => {
  const { login, loading } = useAuth();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) => setUserId(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const userIdElement = form.elements.namedItem('userId') as HTMLInputElement;
    const passwordElement = form.elements.namedItem('password') as HTMLInputElement;
    if (userIdElement && passwordElement) {
      createUserWithEmailAndPassword(auth, userIdElement.value, passwordElement.value)
        .then((userCredential) => {
          console.log(userCredential);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const onClickLogin = () => login(userId);

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          ログイン
        </Heading>
        <Divider my={4} />
        <Box onSubmit={handleSubmit} as="form" px={10} pb={8}>
          <Stack spacing={1} pt={4}>
            <Text>ユーザーID</Text>
            <Input name="userId" placeholder="ユーザーID" value={userId} onChange={onChangeUserId} />
          </Stack>
          <Stack spacing={1} py={4} mb={3}>
            <Text>パスワード</Text>
            <Input name="password" placeholder="パスワード" value={password} onChange={onChangePassword} />
          </Stack>
          <Stack>
            <PrimaryButton disabled={userId === 'aaa'} loading={false} onClick={() => null}>
              ログイン
            </PrimaryButton>
            <PrimaryButton disabled onClick={onClickLogin}>
              新規登録
            </PrimaryButton>
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
});
