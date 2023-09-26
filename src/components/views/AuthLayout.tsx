import { FC, memo } from "react";
import { Outlet } from "react-router-dom";

export const AuthLayout: FC = memo(() => (
  <>
    <Outlet />
  </>
));
