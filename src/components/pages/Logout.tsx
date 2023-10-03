import { FC, memo, useEffect } from "react";
import { auth } from "../../firebase";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { FormFrame } from '../parts/FormFrame';
import { LoadingPage } from '../parts/LoadingPage';
import { useRecoilValue } from 'recoil';
import { loadingState, userState } from '../../recoil/AuthState';

export const Logout: FC = memo(() => {
  const navigation = useNavigate();
  const user = useRecoilValue(userState);
  const loading = useRecoilValue(loadingState)

  useEffect(() => {
    if(!user) {
      // navigation("/auth/");
    }
  }, [user, navigation]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation('/auth/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
      <FormFrame>
        <Button onClick={handleLogout}>ログアウト</Button>
      </FormFrame>
      )}
    </>
  );
});
