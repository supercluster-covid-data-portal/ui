/*
 *
 * Copyright (c) 2021 The Ontario Institute for Cancer Research. All rights reserved
 *
 *  This program and the accompanying materials are made available under the terms of
 *  the GNU Affero General Public License v3.0. You should have received a copy of the
 *  GNU Affero General Public License along with this program.
 *   If not, see <http://www.gnu.org/licenses/>.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 *  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 *  SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 *  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 *  TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 *  OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 *  IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 *  ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

import React, { createContext, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import { EXPLORER_PATH, WALLET_SESSION_KEY } from '../utils/constants';
import getInternalLink from '../utils/getInternalLink';
import { WalletUser } from '../types';

type T_AuthContext = {
  token?: string;
  logout: () => void;
  user?: WalletUser;
  fetchWithAuth: typeof fetch;
  setUser: (user: WalletUser) => void;
};

const AuthContext = createContext<T_AuthContext>({
  token: undefined,
  logout: () => {},
  user: undefined,
  fetchWithAuth: fetch,
  setUser: () => {},
});

export const AuthProvider = ({
  sessionToken,
  initialUser,
  children,
}: {
  sessionToken?: string;
  initialUser?: WalletUser;
  children: React.ReactElement;
}) => {
  const router = useRouter();
  const [token, setTokenState] = useState<string | undefined>(sessionToken);
  const [userState, setUserState] = useState<WalletUser | undefined>(initialUser);
  const removeToken = () => {
    Cookies.remove(WALLET_SESSION_KEY);
    setTokenState(undefined);
    setUserState(undefined);
  };

  const logout = () => {
    removeToken();
    router.push(getInternalLink({ path: EXPLORER_PATH }));
  };

  if (sessionToken && !token) {
    setTokenState(sessionToken);
  } else if (!sessionToken && token) {
    removeToken();
  }

  if (initialUser && !userState) {
    setUserState(initialUser);
  }

  const fetchWithAuth: T_AuthContext['fetchWithAuth'] = (url, options) => {
    return fetch(url, {
      ...options,
      headers: { ...options?.headers, accept: '*/*', Authorization: `Bearer ${token || ''}` },
      body: null,
    });
  };

  const authData = {
    token,
    logout,
    user: userState,
    fetchWithAuth,
    setUser: setUserState,
  };

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default function useAuthContext() {
  return React.useContext(AuthContext);
}
