import React from 'react';
import User from '../../components/pages/user';
import { createPage } from '../../global/utils/pages';

const UserPage = createPage({
  getInitialProps: async ({ egoJwt }) => {
    return { egoJwt };
  },
})(() => {
  return <User />;
});

export default UserPage;
