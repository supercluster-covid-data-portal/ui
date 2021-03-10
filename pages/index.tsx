import React from 'react';

import ExplorerPage from './explorer';
import { createPage } from '../global/utils/pages';

const HomePage = createPage({
  getInitialProps: async () => {},
  isPublic: true,
})(() => {
  return <ExplorerPage />;
});

export default HomePage;
