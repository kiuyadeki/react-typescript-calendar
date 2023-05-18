import { FC, ReactNode, memo } from 'react';
import { Button } from '@chakra-ui/react';

type Props = {
  children: ReactNode;
  disabled?: boolean; // ?で任意の型指定
  loading?: boolean;
  onClick: () => void;
};

export const PrimaryButton: FC<Props> = memo((props) => {
  const {
    children, disabled = false, loading = false, onClick,
  } = props;
  return (
    <Button
      bg="teal.400"
      color="white"
      _hover={{ opacity: 0.8 }}
      isDisabled={disabled || loading}
      isLoading={loading}
      onClick={onClick}
    >
      {children}
    </Button>
  );
});
