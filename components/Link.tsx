import styled from '@emotion/styled';
import { css } from '@emotion/core';

import defaultTheme from './theme';

const StyledLink = styled('a')`
  color: ${({ theme }: { theme: typeof defaultTheme }) => css(theme.colors.secondary_accessible)};
  ${({ theme }: { theme: typeof defaultTheme }) => css(theme.typography.regular)};
  line-height: 24px;
  &:hover {
    color: ${({ theme }: { theme: typeof defaultTheme }) => css(theme.colors.accent)};
  }
`;

export default StyledLink;
