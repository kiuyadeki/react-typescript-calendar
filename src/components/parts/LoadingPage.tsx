import { Box, Flex, Spinner } from '@chakra-ui/react'

export const LoadingPage = () => {
  return (
    <Box>
      <Flex align="center" justify="center" height="100vh" width="100%">
        <Spinner size="xl" />
      </Flex>
    </Box>
  )
}