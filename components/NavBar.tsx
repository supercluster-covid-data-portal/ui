import React from 'react';
import { css } from '@emotion/core';

import defaultTheme from './theme';

const NavBar: React.ComponentType<any> = () => {
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
      <div></div>
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        {/* <div
          css={(theme) => css`
            display: flex;
            align-items: center;
            justify-content: center;
            width: 144px;
            background-color: ${theme.colors.grey_2};
            height: 100%;
            color: ${theme.colors.accent2_dark};
            cursor: pointer;
            &:hover {
              background-color: ${theme.colors.grey_3};
            }
          `}
        >
          Data Explorer
        </div>
        <div
          css={css`
            width: 144px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
          `}
        ></div> */}
      </div>
    </div>
  );
};

export default NavBar;
