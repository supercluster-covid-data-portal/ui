import React from 'react';

import RepositoryPage from './repository';
import { createPage } from '../global/utils/pages';

const HomePage = createPage({
  getInitialProps: async (ctx) => {
    console.log(ctx);
    const { egoJwt, asPath, query } = ctx;
    return { egoJwt, query, asPath };
  },
  isPublic: true,
})(() => {
  return <RepositoryPage />;
});

export default HomePage;
