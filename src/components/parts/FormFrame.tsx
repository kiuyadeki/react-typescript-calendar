import { Flex, Box } from '@chakra-ui/react'
import { FC, memo } from 'react';
import { RequiredChildren } from '../../types/RequiredChildren';

export const FormFrame: FC<RequiredChildren> = memo((props) => {
  const { children } = props
  return (
    <Box>
    <Flex align="center" justify="center" height="100vh" position="relative">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md" position="relative">
        {children}
      </Box>
    </Flex>
  </Box>
  )
});