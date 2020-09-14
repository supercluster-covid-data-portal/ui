import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import defaultTheme from './theme';

const Root = ({ children }: { children: React.ReactElement }) => {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
};

export default Root;
