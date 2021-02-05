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

export const StyledLinkAsButton = styled(StyledLink)`
  ${({ theme }: { theme: typeof defaultTheme }) => css`
    color: ${theme.colors.white};
    background-color: ${theme.colors.accent};
    ${theme.typography.subheading2};
    line-height: 24px;
    border-radius: 5px;
    border: 1px solid ${theme.colors.accent};
    padding: 6px 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;
    text-decoration: none;
    &:hover {
      background-color: ${theme.colors.accent_dark};
      color: ${theme.colors.white};
    }
  `}
`;

export default StyledLink;
