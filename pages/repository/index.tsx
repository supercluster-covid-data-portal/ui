import React from 'react';
import Repository from '../../components/pages/repository';

const RepositoryPage = () => {
  return <Repository />;
};

RepositoryPage.getInitialProps = ({ Component, ctx }: any) => {
  return { ctx };
};

export default RepositoryPage;
