import { BrowserRouter } from 'react-router-dom';
import { Router } from './router/Router';
import { RecoilRoot } from 'recoil';
import { useManageAuthState } from './hooks/useManageAuthState';
import { GlobalStyle } from './assets/styles/globalstyle';

export default function App() {
  return (
    <RecoilRoot>
        <BrowserRouter>
          <ManageAuthState />
          <Router />
        </BrowserRouter>
        <GlobalStyle />
    </RecoilRoot>
  );
}


function ManageAuthState() {
  useManageAuthState();
  return null;
}