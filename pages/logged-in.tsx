import React, { useEffect } from 'react';
import urlJoin from 'url-join';
import Cookies from 'js-cookie';

import { getConfig } from '../global/config';
import { createPage } from '../global/utils/pages';
import { EGO_JWT_KEY } from '../global/utils/constants';
import Router from 'next/router';

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
      Cookies.set(EGO_JWT_KEY, jwt, { secure: false });
      Router.push('/');
      // need validity check for jwt
      // if (isValidJwt(egoToken)) {
      //   return egoToken;
      // }
    })
    .catch((err) => {
      console.warn(err);
      Router.push('/login');
    });
};

const LoginLoaderPage = createPage({
  getInitialProps: async (ctx) => {
    console.log(ctx);
    const { egoJwt, asPath, query } = ctx;
    return { egoJwt, query, asPath };
  },
  isPublic: true,
})(() => {
  useEffect(() => {
    fetchEgoToken();
  });
  return <div>Loading...</div>;
});

export default LoginLoaderPage;
