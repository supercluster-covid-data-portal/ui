import React from 'react';
import { css } from '@emotion/core';
import { useRouter } from 'next/router';

import UserDropdown from './UserDropdown';
import defaultTheme from './theme';
import { OvertureLogo } from './theme/icons';
import useAuthContext from '../global/hooks/useAuthContext';
import { StyledLinkAsButton, InternalLink as Link } from './Link';
import { useTheme } from 'emotion-theming';
import { EXPLORER_PATH, LOGIN_PATH, NAVBAR_HEIGHT, USER_PATH } from '../global/utils/constants';

const NavBar: React.ComponentType<any> = ({ labName = 'Data Management System', labIcon }) => {
  const { token } = useAuthContext();
  const router = useRouter();
  const theme: typeof defaultTheme = useTheme();

  const activeLinkStyle = `
    background-color: ${theme.colors.grey_2};
    color: ${theme.colors.accent2_dark};
  `;

  return (
    <div
      css={(theme: typeof defaultTheme) => css`
        display: flex;
        justify-content: space-between;
        height: ${NAVBAR_HEIGHT}px;
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
        <Link path={EXPLORER_PATH}>
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
            background-color: ${theme.colors.white};
            height: 100%;
            &:hover {
              background-color: ${theme.colors.grey_2};
            }
            border-right: 2px solid ${theme.colors.white};
          `}
        >
          <Link path={EXPLORER_PATH}>
            <a
              css={(theme) => css`
                display: flex;
                flex: 1;
                height: 100%;
                justify-content: center;
                align-items: center;
                text-decoration: none;
                color: ${theme.colors.accent_dark};
                cursor: pointer;
                ${router.pathname === EXPLORER_PATH ? activeLinkStyle : ''}
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
              ${router.pathname === USER_PATH ? activeLinkStyle : ''}
              &:hover {
                background-color: ${theme.colors.grey_2};
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
            <Link path={LOGIN_PATH}>
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
