import React from 'react';
import { css } from '@emotion/core';

import UserDropdown from './UserDropdown';
import defaultTheme from './theme';
import { OvertureLogo } from './theme/icons';
import useAuthContext from '../global/hooks/useAuthContext';
import { StyledLinkAsButton, InternalLink as Link } from './Link';

const NavBar: React.ComponentType<any> = ({ labName = 'Data Management System', labIcon }) => {
  const { token } = useAuthContext();
  return (
    <div
      css={(theme: typeof defaultTheme) => css`
        display: flex;
        justify-content: space-between;
        height: 50px;
        background-color: ${theme.colors.white};
        ${theme.shadow.default};
        position: sticky;
        top: 0;
        left: 0;
        z-index: 5;
        width: 100%;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          margin-left: 16px;
          cursor: pointer;
        `}
      >
        <Link path="repository">
          <a
            css={(theme) => css`
              display: flex;
              align-items: center;
              text-decoration: none;
              ${theme.typography.heading};
              color: ${theme.colors.accent_dark};
            `}
          >
            {labIcon || <OvertureLogo width={35} height={35} />}
            {/* set to default until labname config is implemented */}
            {labName && (
              <span
                css={css`
                  padding-left: 10px;
                `}
              >
                {labName}
              </span>
            )}
          </a>
        </Link>
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <div
          css={(theme) => css`
            display: flex;
            align-items: center;
            justify-content: center;
            width: 144px;
            background-color: ${theme.colors.grey_2};
            height: 100%;
            &:hover {
              background-color: ${theme.colors.grey_3};
            }
            border-right: 2px solid ${theme.colors.white};
          `}
        >
          <Link path="repository">
            <a
              css={(theme) => css`
                display: flex;
                flex: 1;
                height: 100%;
                justify-content: center;
                align-items: center;
                text-decoration: none;
                color: ${theme.colors.accent2_dark};
                cursor: pointer;
              `}
            >
              Data Explorer
            </a>
          </Link>
        </div>
        {token ? (
          <div
            css={(theme) => css`
              width: 195px;
              height: 100%;
              display: flex;
              background-color: ${theme.colors.grey_2};
              &:hover {
                background-color: ${theme.colors.grey_3};
              }
            `}
          >
            <UserDropdown />
          </div>
        ) : (
          <div
            css={css`
              width: 145px;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            <Link path="login">
              <StyledLinkAsButton
                css={(theme) => css`
                  width: 70px;
                  ${theme.typography.button};
                  line-height: 20px;
                `}
              >
                Log in
              </StyledLinkAsButton>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
