import Root from '../components/Root';
import { AppContext } from 'next/app';

import { EGO_JWT_KEY, LOGIN_PATH } from '../global/utils/constants';
import { PageWithConfig } from '../global/utils/pages/types';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import getInternalLink from '../global/utils/getInternalLink';
import { isValidJwt } from '../global/utils/egoTokenUtils';
import { has } from 'lodash';

const DMSApp = ({
  Component,
  pageProps,
  ctx,
}: {
  Component: PageWithConfig;
  pageProps: { [k: string]: any };
  ctx: any;
}) => {
  const [initialToken, setInitialToken] = useState<string>();
  useEffect(() => {
    const egoJwt = localStorage.getItem(EGO_JWT_KEY) || undefined;
    if (isValidJwt(egoJwt)) {
      setInitialToken(egoJwt);
    }
    if (!Component.isPublic && !egoJwt) {
      if (!has(ctx.query, 'session_expired')) {
        console.log('here');
        Router.push(getInternalLink({ path: LOGIN_PATH }));
      }
    }
  });

  return (
    <Root pageContext={ctx} egoJwt={initialToken}>
      <Component {...pageProps} />
    </Root>
  );
};

DMSApp.getInitialProps = async ({ ctx, Component }: AppContext & { Component: PageWithConfig }) => {
  const pageProps = await Component.getInitialProps({ ...ctx });
  return {
    ctx: {
      pathname: ctx.pathname,
      query: ctx.query,
      asPath: ctx.asPath,
    },
    pageProps,
  };
};

export default DMSApp;
