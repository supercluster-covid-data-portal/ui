import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import defaultTheme from './theme';
import Head from './Head';
import { AuthProvider } from '../global/hooks/useAuthContext';
import { PageContext } from '../global/hooks/usePageContext';
import { ClientSideGetInitialPropsContext } from '../global/utils/pages/types';

const Root = ({
  children,
  egoJwt,
  pageContext,
}: {
  children: React.ReactElement;
  egoJwt?: string;
  pageContext: ClientSideGetInitialPropsContext;
}) => {
  return (
    <>
      <style>
        {`
        body {
          margin: 0;
          position: absolute;
          top: 0px;
          bottom: 0px;
          left: 0px;
          right: 0px;
        } /* custom! */
        #__next {
          position: absolute;
          top: 0px;
          bottom: 0px;
          left: 0px;
          right: 0px;
        }
      `}
      </style>
      <Head />
      <AuthProvider egoJwt={egoJwt}>
        <PageContext.Provider value={pageContext}>
          <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
        </PageContext.Provider>
      </AuthProvider>
    </>
  );
};

export default Root;
