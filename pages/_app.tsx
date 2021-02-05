import Root from '../components/Root';
import { AppContext } from 'next/app';
import nextCookies from 'next-cookies';

import { EGO_JWT_KEY } from '../global/utils/constants';
import { PageWithConfig } from '../global/utils/pages/types';
import { isValidJwt } from '../global/utils/egoTokenUtils';

const App = ({
  Component,
  pageProps,
  egoJwt,
}: {
  Component: React.ComponentType<any>;
  pageProps: { [k: string]: any };
  egoJwt?: string;
}) => {
  return (
    <Root egoJwt={egoJwt}>
      <Component {...pageProps} />
    </Root>
  );
};

App.getInitialProps = async ({ ctx, Component }: AppContext & { Component: PageWithConfig }) => {
  const { req, res } = ctx;
  const egoJwt: string | undefined = nextCookies(ctx)[EGO_JWT_KEY];

  if (!isValidJwt(egoJwt)) {
    res &&
      res.setHeader('Set-Cookie', `${EGO_JWT_KEY}=deleted; expires=${new Date(1).toUTCString()}`);
    // if page is not public, force login
    if (res && !Component.isPublic) {
      console.log('not authorized, redirecting to login');
      res.writeHead(302, {
        Location: '/login',
      });
      res.end();
    }
  }
  const pageProps = await Component.getInitialProps({ ...ctx, egoJwt });

  return {
    ctx: {
      pathname: ctx.pathname,
      query: ctx.query,
      asPath: ctx.asPath,
    },
    egoJwt,
    pageProps,
  };
};

export default App;
