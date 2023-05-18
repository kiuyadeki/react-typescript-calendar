import { FC, memo } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const Layout: FC = memo(() => (
  <>
    <Header />
    <Outlet />
  </>
));
