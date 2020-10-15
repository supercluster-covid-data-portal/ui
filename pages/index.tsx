import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import defaultTheme from '../components/theme';

const HomePage = () => {
  const theme: typeof defaultTheme = useTheme();
  return (
    <div
      css={css`
        ${theme.typography.heading}
      `}
    >
      Home Page
    </div>
  );
};

export default HomePage;
