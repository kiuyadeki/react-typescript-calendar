import { EmailVerified } from "../components/pages/EmailVerified";
import { Login } from "../components/pages/Login";
import { Logout } from "../components/pages/Logout";
import { Page404 } from "../components/pages/Page404";
import { ResetPassword } from "../components/pages/ResetPassword";
import { SignUp } from "../components/pages/Signup";
import { Thanks } from "../components/pages/Thanks";

export const authRoutes = [
  {
    path: "",
    index: true,
    element: <Login />,
  },
  {
    path: "signup",
    index: false,
    element: <SignUp />,
  },
  {
    path: "reset-password",
    index: false,
    element: <ResetPassword />,
  },
  {
    path: "thanks",
    index: false,
    element: <Thanks />,
  },
  {
    path: "logout",
    index: false,
    element: <Logout />,
  },
  {
    path: "verified",
    index: false,
    element: <EmailVerified />,
  },
  {
    path: "*",
    index: false,
    element: <Page404 />,
  },
];
