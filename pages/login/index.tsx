import React from 'react';
import Login from '../../components/pages/login';
import { createPage } from '../../global/utils/pages';

const LoginPage = createPage({
  getInitialProps: async ({ egoJwt, query, pathname }) => {
    return { egoJwt, query, pathname };
  },
  isPublic: true,
})((props) => {
  return <Login {...props} />;
});

export default LoginPage;
