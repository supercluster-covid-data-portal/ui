import React from 'react';
import { css } from '@emotion/core';

import defaultTheme from './theme';
import { OvertureLogoWithText } from './theme/icons';

import StyledLink from './Link';

const Footer = () => {
  return (
    <div
      css={(theme: typeof defaultTheme) => css`
        height: ${theme.dimensions.footer.height}px;
        background-color: ${theme.colors.white};
        border-top: 1px solid ${theme.colors.grey_3};
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 18px;
        ${theme.shadow.default};
        z-index: 10;
        position: fixed;
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
        href="https://overture.bio/documentation/dms/user-guide/data-explorer"
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
        href="https://overture.bio/documentation/dms/installation"
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
