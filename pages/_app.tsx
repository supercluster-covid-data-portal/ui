import Root from '../components/Root';

function MyApp({
  Component,
  pageProps,
}: {
  Component: React.ComponentType<any>;
  pageProps: { [k: string]: any };
}) {
  return (
    <Root>
      <Component {...pageProps} />
    </Root>
  );
}

export default MyApp;
