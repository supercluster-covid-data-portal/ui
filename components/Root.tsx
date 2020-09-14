import React from 'react';
import { ThemeProvider, useTheme } from 'emotion-theming';
import defaultTheme from './theme';

const Root = ({ children }: { children: React.ReactElement }) => {
  const theme: typeof defaultTheme = useTheme();
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Root;
