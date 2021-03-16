import React from 'react';
import { css } from '@emotion/core';

import NavBar from './NavBar';
import Footer from './Footer';
import { PageHead } from './Head';

const PageLayout = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => {
  return (
    <>
      <PageHead subtitle={subtitle}></PageHead>
      <div
        css={(theme) => css`
          display: grid;
          grid-template-rows: 50px 1fr;
          min-height: 100vh;
          ${theme.typography.regular}
          color: ${theme.colors.black};
        `}
      >
        <NavBar />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default PageLayout;
