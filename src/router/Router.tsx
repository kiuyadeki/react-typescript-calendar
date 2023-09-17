import { FC, memo } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { Login } from "../components/pages/Login";
import { Page404 } from "../components/pages/Page404";
import { homeRoutes } from "./HomeRoutes";
import { SignUp } from "../components/pages/Signup";
import { Thanks } from "../components/pages/Thanks";
import { EmailVerified } from "../components/pages/EmailVerified";
import { Logout } from "../components/pages/Logout";

export const Router: FC = memo(() => (
  <Routes>
    <Route path="" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/thanks" element={<Thanks />} />
    <Route path="/logout" element={<Logout />} />
    <Route path="/verified" element={<EmailVerified />} />
    <Route path="/home" element={<Layout />}>
      {homeRoutes.map(route => (
        <Route key={route.path} index={route.index} path={route.path} element={route.element} />
      ))}
    </Route>
    <Route path="*" element={<Page404 />} />
  </Routes>
));
