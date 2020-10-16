import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import defaultTheme from './theme';
import { OvertureLogoWithText } from './theme/icons';

const StyledLink = styled('a')`
  color: ${({ theme }: { theme: typeof defaultTheme }) => css(theme.colors.secondary_accessible)};
  ${({ theme }) => css(theme.typography.subheading2)};
  line-height: 24px;
`;

const Footer = () => {
  return (
    <div
      css={(theme: typeof defaultTheme) => css`
        height: 47px;
        background-color: ${theme.colors.white};
        border-top: 1px solid ${theme.colors.grey_3};
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 18px;
        ${theme.shadow.default};
        z-index: 10;
      `}
    >
      <StyledLink
        css={css`
          padding-right: 13px;
        `}
        // TODO: broken link
        href="https://overture.bio/Documentation/DMS/For-users/DataExplorer"
        target="_blank"
      >
        Help
      </StyledLink>
      |
      <StyledLink
        css={css`
          padding-left: 13px;
          padding-right: 5px;
        `}
        // TODO: broken link
        href="https://overture.bio/Documentation/DMS/For-admins/howtoinstalldms"
        target="_blank"
      >
        DMS
      </StyledLink>
      <span
        css={(theme) =>
          css`
            color: ${theme.colors.accent_dark};
            ${theme.typography.subheading2}
            line-height: 24px;
            font-weight: normal;
            padding-right: 10px;
          `
        }
      >
        powered by
      </span>
      <OvertureLogoWithText width={100} height={18} />
    </div>
  );
};

export default Footer;
