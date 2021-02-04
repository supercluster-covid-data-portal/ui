import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import { EGO_JWT_KEY } from '../utils/constants';

type T_AuthContext = {
  token?: string;
  logout: () => void;
};

const AuthContext = createContext<T_AuthContext>({
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
  const router = useRouter();
  const [token, setTokenState] = useState<string>(egoJwt);

  // need validation
  if (egoJwt && token !== egoJwt) {
    setTokenState(egoJwt);
  }

  const setToken = (token: string) => {
    Cookies.set(EGO_JWT_KEY, token);
    setTokenState(token);
  };

  const removeToken = () => {
    Cookies.remove(EGO_JWT_KEY);
    setTokenState(null);
  };

  const logout = () => {
    removeToken();
    router.push('/login');
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
