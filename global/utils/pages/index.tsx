import { PageConfigProps, PageWithConfig } from './types';

type CreatePageConfigs = {
  getInitialProps?: PageConfigProps['getInitialProps'];
};

export const createPage = <P extends {} = any>({ getInitialProps }: CreatePageConfigs) => (
  page: React.ComponentType<P> & CreatePageConfigs = () => <div>Here's a page</div>,
): PageWithConfig => {
  page.getInitialProps = getInitialProps || (async () => []);
  return page as PageWithConfig;
};
