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

import React, { useEffect } from 'react';
import urlJoin from 'url-join';
import { css } from '@emotion/core';

import { createPage } from '../global/utils/pages';
import PageLayout from '../components/PageLayout';
import Loader from '../components/Loader';
import { getConfig } from '../global/config';
import { EXPLORER_PATH, TOKEN_ENDPOINT } from '../global/utils/constants';
import { useRouter } from 'next/router';
import useAuthContext from '../global/hooks/useAuthContext';
import { WalletUser } from '../global/types';
import validateUser from '../global/utils/validateUser';

const LoginLoaderPage = createPage({
  getInitialProps: async (ctx) => {
    const { walletToken, asPath, query } = ctx;
    return { walletToken, query, asPath };
  },
  isPublic: true,
})(({ query }) => {
  const router = useRouter();
  const { NEXT_PUBLIC_ARRANGER_API_URL } = getConfig();
  const { setUser } = useAuthContext();

  useEffect(() => {
    if (query.code) {
      const loginUrl = new URL(urlJoin(NEXT_PUBLIC_ARRANGER_API_URL, TOKEN_ENDPOINT));
      loginUrl.searchParams.append('code', query.code);

      fetch(loginUrl.href, { method: 'POST', credentials: 'include' })
        .then(async (res) => {
          if (res.status !== 200) {
            throw Error('Token request failed');
          }
          // set userinfo in auth context
          const userData = await res.json();
          setUser(validateUser(userData));
          router.push(EXPLORER_PATH);
        })
        .catch((err) => {
          console.warn('Login failed: ', err);
          router.push('/');
        });
    }
  }, []);

  return (
    <PageLayout>
      <div
        css={(theme) =>
          css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: ${theme.colors.grey_200};
          `
        }
      >
        <Loader />
        <div
          css={(theme) =>
            css`
              margin-top: 2rem;
              color: ${theme.colors.accent};
              ${theme.typography.heading}
            `
          }
        >
          Logging in...
        </div>
      </div>
    </PageLayout>
  );
});

export default LoginLoaderPage;
