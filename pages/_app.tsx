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

import Root from '../components/Root';
import { AppContext } from 'next/app';
import { useEffect, useState } from 'react';
import nextCookies from 'next-cookies';
import { getConfig } from '../global/config';
import urlJoin from 'url-join';

import { USERINFO_ENDPOINT } from '../global/utils/constants';
import { PageWithConfig } from '../global/utils/pages/types';
import Loader from '../components/Loader';
import validateUser from '../global/utils/validateUser';
import { WalletUser } from '../global/types';
import useAuthContext from '@/global/hooks/useAuthContext';

const DMSApp = ({
  Component,
  pageProps,
  ctx,
  walletToken,
}: {
  Component: PageWithConfig;
  pageProps: { [k: string]: any };
  ctx: any;
  walletToken: string;
}) => {
  const [loadingUser, setLoadingUser] = useState(true);
  const [initialUser, setInitialUser] = useState<WalletUser | undefined>(undefined);
  const { removeToken } = useAuthContext();
  const { NEXT_PUBLIC_ARRANGER_API_URL } = getConfig();

  useEffect(() => {
    if (!initialUser && walletToken) {
      console.info('Fetching user info');
      fetch(urlJoin(NEXT_PUBLIC_ARRANGER_API_URL, USERINFO_ENDPOINT), { credentials: 'include' })
        .then(async (res) => {
          if (res.ok) {
            const userData = await res.json();
            return setInitialUser(validateUser(userData));
          }
          removeToken();
          throw new Error(res.statusText);
        })
        .catch((err) => console.warn('Could not fetch user info: ', err))
        .finally(() => setLoadingUser(false));
    } else {
      setLoadingUser(false);
    }
  }, []);

  return (
    <Root pageContext={ctx} sessionToken={walletToken} initialUser={initialUser}>
      {/* TODO: verify loading behaviour */}
      {loadingUser ? <Loader /> : <Component {...pageProps} />}
    </Root>
  );
};

DMSApp.getInitialProps = async ({ ctx, Component }: AppContext & { Component: PageWithConfig }) => {
  const pageProps = await Component.getInitialProps({ ...ctx });
  const cookies = nextCookies(ctx);
  const { NEXT_PUBLIC_SESSION_TOKEN_KEY } = getConfig();
  return {
    ctx: {
      pathname: ctx.pathname,
      query: ctx.query,
      asPath: ctx.asPath,
    },
    walletToken: cookies[NEXT_PUBLIC_SESSION_TOKEN_KEY],
    pageProps,
  };
};

export default DMSApp;
