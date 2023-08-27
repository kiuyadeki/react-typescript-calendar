import {
  Alert, AlertIcon, Box, Divider, Flex, Heading, Input, SlideFade, Stack, Text,
} from '@chakra-ui/react';
import {
  ChangeEvent, FC, FormEvent, memo, useState,
} from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification, sendSignInLinkToEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../atoms/button/PrimaryButton';
import { useAuth } from '../../hooks/useAuth';
import { auth } from '../../firebase';

export const SignUp: FC = memo(() => {
  const [show, setShow] = useState(false);
  const { loading } = useAuth();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const navigation = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const emailElement = form.elements.namedItem('email') as HTMLInputElement;
    setShow(false);
    if (emailElement) {
      const email = emailElement.value;
      const actionCodeSettings = {
        url: 'https://react-typescript-calendar-9c6g.vercel.app?email=' + email,
        handleCodeInApp: true,
      };

      try {
        await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        console.log('SignIn Link sent!');
        window.localStorage.setItem('emailForSignIn', email);
      } catch (error: any) {
        let message: string;
        switch (error.code) {
          case 'auth/invalid-email':
            message = '無効なメールアドレスです。';
            break;
          default:
            message = 'メールの送信中にエラーが発生しました。';
        }
        setErrorMessage(message);
        setShow(true);
      }
    }
  };

  return (
    <Flex align="center" justify="center" height="100vh" position="relative">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md" position="relative">
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
          ユーザー登録
        </Heading>
        <Divider my={4} />
        <Box onSubmit={handleSubmit} as="form" px={10} pb={8}>
          <Stack spacing={1} pt={4} py={4} mb={3}>
            <Text>Email</Text>
            <Input name="email" placeholder="info@email.com" value={email} onChange={onChangeUserId} />
          </Stack>
          <Stack>
            <PrimaryButton disabled={email === ''} loading={loading} onClick={() => null}>
              メールを送信する
            </PrimaryButton>
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
});
