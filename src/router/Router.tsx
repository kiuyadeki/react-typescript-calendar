import { FC, memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '../components/pages/organisms/layout/Layout';
import { Login } from '../components/pages/Login';
import { Page404 } from '../components/pages/Page404';
import { homeRoutes } from './HomeRoutes';
import { SignUp } from '../components/pages/Signup';
import { Thanks } from '../components/pages/Thanks';

export const Router: FC = memo(() => (
  <Routes>
    <Route path="" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/thanks" element={<Thanks />} />
    <Route path="/home" element={<Layout />}>
      {homeRoutes.map((route) => (
        <Route key={route.path} index={route.index} path={route.path} element={route.element} />
      ))}
    </Route>
    <Route path="*" element={<Page404 />} />
  </Routes>
));
