import React, { memo, FC } from 'react';
import { Box, Heading } from '@chakra-ui/react';

export const Thanks: FC = memo(() => {
  return (
    <Box>
      <Heading as="h1" size="lg" textAlign="center">
        ありがとうございます。
      </Heading>
    </Box>
  );
});
