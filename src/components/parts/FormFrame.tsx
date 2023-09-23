import { Flex, Box } from '@chakra-ui/react'

export const FormFrame = ({children}: any) => {
  return (
    <Box>
    <Flex align="center" justify="center" height="100vh" position="relative">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md" position="relative">
        {children}
      </Box>
    </Flex>
  </Box>
  )
}