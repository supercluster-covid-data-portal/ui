import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import defaultTheme from './theme';
import Head from './Head';
import { AuthProvider } from '../global/hooks/useAuthContext';

const Root = ({ children, egoJwt }: { children: React.ReactElement; egoJwt: string }) => {
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
        <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
      </AuthProvider>
    </>
  );
};

export default Root;
