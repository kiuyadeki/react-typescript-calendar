import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './router/Router';
import theme from './theme/theme';
import { RecoilRoot } from 'recoil';
import { useManageAuthState } from './hooks/useManageAuthState';

export default function App() {
  return (
    <RecoilRoot>
    <ChakraProvider theme={theme}>
        <BrowserRouter>
          <ManageAuthState />
          <Router />
        </BrowserRouter>
    </ChakraProvider>
    </RecoilRoot>
  );
}


function ManageAuthState() {
  useManageAuthState();
  return null;
}