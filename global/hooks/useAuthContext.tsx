import React, { createContext, useState } from 'react';
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

  const removeToken = () => {
    localStorage.removeItem(EGO_JWT_KEY);
    setTokenState(null);
  };

  const logout = () => {
    removeToken();
    router.push('/login');
  };

  if (token !== egoJwt) {
    setTokenState(egoJwt);
  }

  const authData = {
    token,
    logout,
  };

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default function useAuthContext() {
  return React.useContext(AuthContext);
}
