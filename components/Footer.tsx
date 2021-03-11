import React from 'react';
import { css } from '@emotion/core';

import defaultTheme from './theme';
import { OvertureLogoWithText } from './theme/icons';

import StyledLink from './Link';

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
        position: absolute;
        bottom: 0px;
        left: 0px;
        right: 0px;
      `}
    >
      <StyledLink
        css={(theme) => css`
          ${theme.typography.subheading2};
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
        css={(theme) => css`
          ${theme.typography.subheading2};
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
            padding-left: 5px;
          `
        }
      >
        powered by
      </span>
      <a href="https://www.overture.bio/" target="_blank">
        <OvertureLogoWithText width={100} height={18} />
      </a>
    </div>
  );
};

export default Footer;
