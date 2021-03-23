import React, { createContext, useState } from 'react';
import Router, { useRouter } from 'next/router';

import { EGO_JWT_KEY, EXPLORER_PATH, LOGIN_PATH } from '../utils/constants';
import { decodeToken, extractUser, isValidJwt } from '../utils/egoTokenUtils';
import { UserWithId } from '../../global/types';
import getInternalLink from '../utils/getInternalLink';

type T_AuthContext = {
  token?: string;
  // logout: () => void;
  logout: any;
  user?: UserWithId;
  fetchWithAuth: typeof fetch;
  jwtExpired: boolean;
};

const AuthContext = createContext<T_AuthContext>({
  token: undefined,
  logout: () => {},
  user: undefined,
  fetchWithAuth: fetch,
  jwtExpired: false,
});

export const AuthProvider = ({
  egoJwt,
  children,
}: {
  egoJwt?: string;
  children: React.ReactElement;
}) => {
  const router = useRouter();
  // TODO: typing this state as `string` causes a compiler error. the same setup exists in argo but does not cause
  // a type issue. using `any` for now
  const [token, setTokenState] = useState<any>(egoJwt);
  const [jwtExpired, setJwtExpired] = useState<boolean>(false);
  const removeToken = () => {
    localStorage.removeItem(EGO_JWT_KEY);
    setTokenState(null);
  };

  const logout = ({ path = EXPLORER_PATH, params }: { path: string; params?: string }) => {
    removeToken();
    router.push(getInternalLink({ path, params }));
  };

  const logoutToRoot = () => {
    // router.push(`${LOGIN_PATH}?session_expired=true`, undefined, { shallow: true });
    logout({ path: LOGIN_PATH, params: 'session_expired=true' });
  };

  if (!token && isValidJwt(egoJwt)) {
    setTokenState(egoJwt);
  } else if (token && !isValidJwt(token)) {
    if (egoJwt && token === egoJwt) {
      logoutToRoot();
    }
  }

  const fetchWithAuth: T_AuthContext['fetchWithAuth'] = (url, options) => {
    return fetch(url, {
      ...options,
      headers: { ...options?.headers, accept: '*/*', Authorization: `Bearer ${token || ''}` },
      body: null,
    });
  };

  const userInfo = token ? decodeToken(token) : null;
  const user = userInfo ? extractUser(userInfo) : undefined;
  const authData = {
    token,
    logout,
    user,
    fetchWithAuth,
    jwtExpired,
  };

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default function useAuthContext() {
  return React.useContext(AuthContext);
}
