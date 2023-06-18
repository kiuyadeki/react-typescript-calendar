import {
  Box, Divider, Flex, Heading, Input, Stack, Text,
} from '@chakra-ui/react';
import {
  ChangeEvent, FC, FormEvent, memo, useState,
} from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { PrimaryButton } from '../atoms/button/PrimaryButton';
import { useAuth } from '../../hooks/useAuth';
import { auth } from '../../firebase';

export const SignUp: FC = memo(() => {
  const { loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const emailElement = form.elements.namedItem('email') as HTMLInputElement;
    const passwordElement = form.elements.namedItem('password') as HTMLInputElement;
    if (emailElement && passwordElement) {
      createUserWithEmailAndPassword(auth, emailElement.value, passwordElement.value)
        .then((userCredential) => {
          console.log(userCredential);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          ユーザー登録
        </Heading>
        <Divider my={4} />
        <Box onSubmit={handleSubmit} as="form" px={10} pb={8}>
          <Stack spacing={1} pt={4}>
            <Text>Email</Text>
            <Input name="email" placeholder="ユーザーID" value={email} onChange={onChangeUserId} />
          </Stack>
          <Stack spacing={1} py={4} mb={3}>
            <Text>パスワード</Text>
            <Input name="password" placeholder="パスワード" value={password} onChange={onChangePassword} />
          </Stack>
          <Stack>
            <PrimaryButton disabled={email === ''} loading={loading} onClick={() => null}>
              新規登録
            </PrimaryButton>
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
});
