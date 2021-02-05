import React, { useEffect } from 'react';
import urlJoin from 'url-join';
import Cookies from 'js-cookie';
import { css } from '@emotion/core';

import { getConfig } from '../global/config';
import { createPage } from '../global/utils/pages';
import { EGO_JWT_KEY } from '../global/utils/constants';
import Router from 'next/router';
import { isValidJwt } from '../global/utils/egoTokenUtils';
import PageLayout from '../components/PageLayout';

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
        Cookies.set(EGO_JWT_KEY, jwt);
        setTimeout(() => Router.push('/repository'), 2000);
      } else {
        throw new Error('Invalid jwt, cannot login.');
      }
    })
    .catch((err) => {
      console.warn(err);
      Cookies.remove(EGO_JWT_KEY);
      Router.push('/login');
    });
};

const Loader = () => {
  return (
    <div
      css={(theme) => css`
        border: 14px solid ${theme.colors.grey_3};
        border-top: 14px solid ${theme.colors.secondary_dark};
        border-radius: 50%;
        width: 120px;
        height: 120px;
        animation: spin 2s linear infinite;

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}
    />
  );
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
