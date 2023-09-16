import { FC, memo } from 'react';
import { auth } from '../../firebase';
import { Box, Button, Flex } from '@chakra-ui/react';

export const Logout: FC = memo(() => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("sign out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  return (
    <Box>
      <Flex align="center" justify="center" height="100vh" position="relative">
        <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md" position="relative">
          <Button onClick={handleLogout}>ログアウト</Button>
        </Box>
      </Flex>
    </Box>
  )
});