import React from 'react';
import Explorer from '../../components/pages/explorer';
import { createPage } from '../../global/utils/pages';

const ExplorerPage = createPage({
  getInitialProps: async ({ query, egoJwt }) => {
    return { query, egoJwt };
  },
  isPublic: true,
})(() => {
  return <Explorer />;
});

export default ExplorerPage;
