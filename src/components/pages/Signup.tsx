import { Alert, AlertIcon, Box, Divider, Flex, Heading, Input, SlideFade, Stack, Text } from "@chakra-ui/react";
import { ChangeEvent, FC, FormEvent, memo, useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, sendSignInLinkToEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../parts/PrimaryButton";
import { useAuth } from "../../hooks/useAuth";
import { auth } from "../../firebase";

export const SignUp: FC = memo(() => {
  const [show, setShow] = useState(false);
  const { loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const navigation = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const emailElement = form.elements.namedItem("email") as HTMLInputElement;
    const passwordElement = form.elements.namedItem("password") as HTMLInputElement;
    setShow(false);
    if (emailElement && passwordElement) {
      createUserWithEmailAndPassword(auth, emailElement.value, passwordElement.value)
        .then(userCredential => {
          const user = userCredential.user;
          if (user) {
            sendEmailVerification(user)
              .then(() => {
                console.log("Verification email sent!");
              })
              .catch(error => {
                console.error("Error sending verification email:", error.message);
              });
          }
          navigation("/thanks");
        })
        .catch((error: { code: string }) => {
          let message: string;
          switch (error.code) {
            case "auth/email-already-in-use":
              message = "このメールアドレスは既に登録されています。";
              break;
            case "auth/invalid-email":
              message = "無効なメールアドレスです。";
              break;
            default:
              message = "入力情報に誤りがあります。";
          }
          setErrorMessage(message);
          setShow(true);
        });
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
          <Stack spacing={1} pt={4}>
            <Text>Email</Text>
            <Input
              name="email"
              autoComplete="email"
              placeholder="info@email.com"
              value={email}
              onChange={onChangeUserId}
            />
          </Stack>
          <Stack spacing={1} py={4} mb={3}>
            <Text>パスワード</Text>
            <Input name="password" placeholder="パスワード" value={password} onChange={onChangePassword} />
            <Text fontSize="sm" color="gray">
              6文字以上、半角英数のみ
            </Text>
          </Stack>
          <Stack>
            <PrimaryButton disabled={email === ""} loading={loading} onClick={() => null}>
              新規登録
            </PrimaryButton>
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
});
