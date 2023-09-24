import { FC, memo } from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../components/pages/Login";
import { Page404 } from "../components/pages/Page404";
import { authRoutes } from "./AuthRoutes";
import { AuthLayout } from "../components/views/AuthLayout";

export const Router: FC = memo(() => (
  <Routes>
    <Route path="" element={<Login />} />
    <Route path="/auth" element={<AuthLayout />}>
      {authRoutes.map(route => (
        <Route key={route.path} index={route.index} path={route.path} element={route.element} />
      ))}
    </Route>
    <Route path="*" element={<Page404 />} />
  </Routes>
));
