import React from 'react';
import { css } from '@emotion/core';

import defaultTheme from './theme';
import NavBar from './NavBar';
import Footer from './Footer';

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      css={(theme: typeof defaultTheme) => css`
        background-color: ${theme.colors.grey_2};
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
  );
};

export default PageLayout;
