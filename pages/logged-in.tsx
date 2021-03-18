import React, { useEffect } from 'react';
import urlJoin from 'url-join';
import { css } from '@emotion/core';

import { getConfig } from '../global/config';
import { createPage } from '../global/utils/pages';
import { EGO_JWT_KEY, EXPLORER_PATH, LOGIN_PATH } from '../global/utils/constants';
import Router from 'next/router';
import { isValidJwt } from '../global/utils/egoTokenUtils';
import PageLayout from '../components/PageLayout';
import getInternalLink from '../global/utils/getInternalLink';
import Loader from '../components/Loader';

const fetchEgoToken = () => {
  const { NEXT_PUBLIC_EGO_API_ROOT, NEXT_PUBLIC_EGO_CLIENT_ID } = getConfig();
  const egoLoginUrl = urlJoin(
    NEXT_PUBLIC_EGO_API_ROOT,
    `/oauth/ego-token?client_id=${NEXT_PUBLIC_EGO_CLIENT_ID}`,
  );

  fetch(egoLoginUrl, {
    credentials: 'include',
    headers: { accept: '*/*' },
    body: null,
    method: 'POST',
  })
    .then((res) => {
      if (res.status !== 200) {
        throw new Error();
      }
      return res.text();
    })
    .then((jwt) => {
      if (isValidJwt(jwt)) {
        localStorage.setItem(EGO_JWT_KEY, jwt);
        setTimeout(() => Router.push(getInternalLink({ path: EXPLORER_PATH })), 2000);
      } else {
        throw new Error('Invalid jwt, cannot login.');
      }
    })
    .catch((err) => {
      console.warn(err);
      localStorage.removeItem(EGO_JWT_KEY);
      Router.push(getInternalLink({ path: LOGIN_PATH }));
    });
};

const LoginLoaderPage = createPage({
  getInitialProps: async (ctx) => {
    const { egoJwt, asPath, query } = ctx;
    return { egoJwt, query, asPath };
  },
  isPublic: true,
})(() => {
  useEffect(() => {
    fetchEgoToken();
  });

  return (
    <PageLayout>
      <div
        css={(theme) =>
          css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: ${theme.colors.grey_2};
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
