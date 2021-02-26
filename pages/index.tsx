import React from 'react';

import RepositoryPage from './repository';
import { createPage } from '../global/utils/pages';

const HomePage = createPage({
  getInitialProps: async () => {},
  isPublic: true,
})(() => {
  return <RepositoryPage />;
});

export default HomePage;
