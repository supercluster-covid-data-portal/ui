import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import defaultTheme from './theme';
import Head from './Head';

const Root = ({ children }: { children: React.ReactElement }) => {
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
      <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
    </>
  );
};

export default Root;
