import React from 'react';
import Repository from '../../components/pages/repository';
import { createPage } from '../../global/utils/pages';

const RepositoryPage = createPage({
  getInitialProps: async ({ query, egoJwt }) => {
    return { query, egoJwt };
  },
  isPublic: true,
})(() => {
  return <Repository />;
});

export default RepositoryPage;
