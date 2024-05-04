import { BrowserRouter } from 'react-router-dom';
import { Router } from './router/Router';
import theme from './theme/theme';
import { RecoilRoot } from 'recoil';
import { useManageAuthState } from './hooks/useManageAuthState';

export default function App() {
  return (
    <RecoilRoot>
        <BrowserRouter>
          <ManageAuthState />
          <Router />
        </BrowserRouter>
    </RecoilRoot>
  );
}


function ManageAuthState() {
  useManageAuthState();
  return null;
}