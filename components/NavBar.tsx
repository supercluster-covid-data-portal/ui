import React, { useState } from 'react';
import { css } from '@emotion/core';
import Router from 'next/router';

import UserDropdown from './UserDropdown';
import defaultTheme from './theme';
import { OvertureLogo } from './theme/icons';
import useAuthContext from '../global/hooks/useAuthContext';
import Button from './Button';

const LoginButton = ({ onClick }: { onClick?: () => any }) => {
  return (
    <button
      onClick={onClick}
      css={(theme: typeof defaultTheme) => css`
        ${theme.typography.button};
        background-color: ${theme.colors.accent};
        color: ${theme.colors.white};
        width: 73px;
        height: 32px;
        border: 1px solid ${theme.colors.accent};
        border-radius: 5px;
        margin: 0.5rem;
        cursor: pointer;
        &:hover {
          ${theme.shadow.default};
        }
      `}
    >
      Login
    </button>
  );
};

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
        <a
          href="/repository"
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
          <a
            css={(theme) => css`
              display: flex;
              flex: 1;
              height: 100%;
              justify-content: center;
              align-items: center;
              text-decoration: none;
              color: ${theme.colors.accent2_dark};
            `}
            href="/repository"
          >
            Data Explorer
          </a>
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
            <Button
              css={(theme) => css`
                width: 90px;
                ${theme.typography.button};
                line-height: 20px;
              `}
              onClick={() => Router.push('/login')}
            >
              Log in
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
