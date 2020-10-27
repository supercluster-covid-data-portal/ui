import React from 'react';
import Login from '../../components/pages/login';

const LoginPage = () => {
  return <Login />;
};

LoginPage.getInitialProps = ({ Component, ctx }: any) => {
  return { ctx };
};

export default LoginPage;
