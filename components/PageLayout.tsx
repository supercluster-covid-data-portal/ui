import React, { ReactNode } from 'react';
import { css } from '@emotion/core';

import NavBar from './NavBar';
import Footer from './Footer';
import { PageHead } from './Head';
import ErrorNotification from './ErrorNotification';

const PageLayout = ({ children, subtitle }: { children: ReactNode; subtitle?: string }) => {
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

export const ErrorPageLayout = ({
  children,
  subtitle,
  errorTitle,
}: {
  children: ReactNode;
  subtitle: string;
  errorTitle: string;
}) => {
  return (
    <PageLayout subtitle={subtitle}>
      <ErrorNotification
        size="lg"
        title={errorTitle}
        styles={`
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}
      >
        {children}
      </ErrorNotification>
    </PageLayout>
  );
};
export default PageLayout;
