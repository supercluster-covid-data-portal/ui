import Root from '../components/Root';
import { NextPageContext } from 'next';

const App = ({
  Component,
  pageProps,
  egoJwt = '',
  ctx,
}: {
  Component: React.ComponentType<any>;
  pageProps: { [k: string]: any };
  egoJwt?: string;
  ctx: NextPageContext;
}) => {
  return (
    <Root egoJwt={egoJwt}>
      <Component {...pageProps} />
    </Root>
  );
};

export default App;
