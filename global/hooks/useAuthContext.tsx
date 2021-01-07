import React from 'react';

import { EGO_JWT_KEY } from '../utils/constants';
// logout
// update
// set

type T_AuthContext = {
  token?: string | null;
  logout: () => void;
  updateToken?: () => Promise<string | void>;
};

const AuthContext = React.createContext<T_AuthContext>({
  token: undefined,
  logout: () => {},
  updateToken: async () => {},
});

export const AuthProvider = ({
  egoJwt,
  children,
}: {
  egoJwt: string;
  children: React.ReactElement;
}) => {
  const [token, setTokenState] = React.useState<string | null>(egoJwt);

  const setToken = (token: string) => {
    localStorage.setItem(EGO_JWT_KEY, token);
    setTokenState(token);
  };

  const removeToken = () => {
    localStorage.removeItem(EGO_JWT_KEY);
    setTokenState(null);
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
