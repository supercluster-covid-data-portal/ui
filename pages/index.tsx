import React from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import urlJoin from 'url-join';

import defaultTheme from '../components/theme';
import { getConfig } from '../global/config';
import { EGO_JWT_KEY } from '../global/utils/constants';

const HomePage = () => {
  const theme: typeof defaultTheme = useTheme();
  const { NEXT_PUBLIC_EGO_API_ROOT, NEXT_PUBLIC_EGO_CLIENT_ID } = getConfig();
  React.useEffect(() => {
    const egoLoginUrl = urlJoin(
      NEXT_PUBLIC_EGO_API_ROOT,
      `/api/oauth/ego-token?client_id=${NEXT_PUBLIC_EGO_CLIENT_ID}`,
    );
    fetch(egoLoginUrl, {
      credentials: 'include',
      headers: { accept: '*/*' },
      body: null,
      method: 'GET',
      mode: 'cors',
    })
      .then((res) => res.text())
      .then((egoToken) => {
        localStorage.setItem(EGO_JWT_KEY, egoToken);
        redirect(egoToken);
      })
      .catch((err) => {
        console.warn('err: ', err);
        redirect(null);
      });
  });
  return (
    <div
      css={css`
        ${theme.typography.heading}
      `}
    >
      Home Page
    </div>
  );
};

export default HomePage;
