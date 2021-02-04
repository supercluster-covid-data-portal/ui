import styled from '@emotion/styled';
import { css } from '@emotion/core';

import defaultTheme from './theme';

const StyledLink = styled('a')`
  ${({ theme }: { theme: typeof defaultTheme }) => css`
    color: ${theme.colors.secondary_accessible};
    ${theme.typography.regular};
    line-height: 24px;
    &:hover {
      color: ${theme.colors.accent};
    }
  `}
`;

export default StyledLink;
