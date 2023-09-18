import { Dispatch, ReactNode, SetStateAction, createContext, useMemo, useState } from "react";
import { User } from "../types/user";

type LoginUser = User & { isAdmin: boolean };

export type LoginUserContextType = {
  loginUser: LoginUser | null;
  setLoginUser: Dispatch<SetStateAction<LoginUser | null>>;
};

export const LoginUserContext = createContext<LoginUserContextType>({} as LoginUserContextType);

export function LoginUserProvider(props: { children: ReactNode }) {
  const { children } = props;
  const [loginUser, setLoginUser] = useState<LoginUser | null>(null);
  const value = useMemo(() => {
    return {
      loginUser,
      setLoginUser,
    };
  }, [loginUser, setLoginUser]);
  return <LoginUserContext.Provider value={value}>{children}</LoginUserContext.Provider>;
}
