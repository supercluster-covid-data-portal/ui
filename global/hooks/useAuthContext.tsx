import React from 'react';
import Cookies from 'js-cookie';

import { EGO_JWT_KEY } from '../utils/constants';

type T_AuthContext = {
  token?: string;
  logout: () => void;
};

const AuthContext = React.createContext<T_AuthContext>({
  token: undefined,
  logout: () => {},
});

export const AuthProvider = ({
  egoJwt,
  children,
}: {
  egoJwt?: string;
  children: React.ReactElement;
}) => {
  const [token, setTokenState] = React.useState<string | undefined>(egoJwt);

  const setToken = (token: string) => {
    Cookies.set(EGO_JWT_KEY, token, { secure: true });
    setTokenState(token);
  };

  const removeToken = () => {
    // localStorage.removeItem(EGO_JWT_KEY);
    Cookies.remove(EGO_JWT_KEY);
    // setTokenState(null);
  };

  const logout = () => {
    removeToken();
  };

  const authData = {
    token,
    logout,
  };

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default function useAuthContext() {
  return React.useContext(AuthContext);
}
