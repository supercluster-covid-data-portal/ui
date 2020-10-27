import React from 'react';
import Login from '../../components/pages/login';
import { createPage } from '../../global/utils/pages';

const LoginPage = createPage({
  getInitialProps: async ({ egoJwt }) => {
    return { egoJwt };
  },
})(() => {
  return <Login />;
});

export default LoginPage;
