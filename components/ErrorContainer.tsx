import { css } from '@emotion/core';
import React from 'react';

import theme from './theme';
import { Error } from './theme/icons';
import Dismiss from './theme/icons/dismiss';
import { IconProps } from './theme/icons/types';

type ErrorSize = 'sm' | 'md' | 'lg';

const titleStyles = {
  lg: `
    margin: 0.5rem 0 1rem;
    font-size: 24px;
    line-height: 38px;
  `,
  md: `
    margin: 0rem;
    padding-bottom: 0.4rem;
    font-size: 18px;
    line-height: 20px
  `,
  sm: '',
};

const containerStyles = {
  lg: `
    padding: 1rem 2rem;
    line-height: 26px;
    max-width: 600px;
  `,
  md: `
    padding: 1rem;
    line-height: 24px;
  `,
  sm: `
    padding: 0.5rem;
    line-height: 20px;
    display: flex;
    align-items: center;
  `,
};

type IconDimensions = {
  [key in ErrorSize]: {
    width: number;
    height: number;
  };
};

const iconStyles = {
  lg: `
    padding-right: 15px
  `,
  md: `
    padding-right: 15px
  `,
  sm: ``,
};

const iconDimensions: IconDimensions = {
  lg: { width: 26, height: 27 },
  md: { width: 21, height: 22 },
  sm: { width: 17, height: 17 },
};

const IconButton = ({
  Icon,
  fill,
  height,
  width,
  onClick = () => {},
}: {
  Icon: React.ComponentType<IconProps>;
  fill: string;
  height: number;
  width: number;
  onClick: React.MouseEventHandler;
}) => {
  return (
    <span
      onClick={onClick}
      css={css`
        cursor: pointer;
      `}
    >
      <Icon height={height} width={width} fill={fill} />
    </span>
  );
};

const ErrorContainer = ({
  children,
  title = '',
  size,
  styles = '',
  onDismiss,
  dismissible = false,
}: {
  children: React.ReactNode;
  title?: string;
  size: ErrorSize;
  styles?: string;
  onDismiss?: Function;
  dismissible?: boolean;
}) => (
  <div
    css={css`
      display: flex;
      flex: 1;
      ${styles}
    `}
  >
    <div
      css={(theme) =>
        css`
          border: 1px solid ${theme.colors.error_2};
          border-radius: 5px;
          ${theme.shadow.default};
          ${theme.typography.subheading};
          font-weight: normal;
          background-color: ${theme.colors.error_1};
          color: ${theme.colors.accent_dark};
          ${containerStyles[size]};
        `
      }
    >
      {title ? (
        <div>
          <h2
            css={css`
              display: flex;
              align-items: center;
              ${titleStyles[size]}
            `}
          >
            <Error
              height={iconDimensions[size].height}
              width={iconDimensions[size].width}
              style={css`
                ${iconStyles[size]}
              `}
            />{' '}
            {title}
            {dismissible && <Dismiss height={15} width={15} fill={theme.colors.error_dark} />}
          </h2>
          {children}
        </div>
      ) : (
        <div
          css={css`
            display: flex;
            flex-direction: row;
          `}
        >
          <Error
            height={iconDimensions[size].height}
            width={iconDimensions[size].width}
            style={css`
              ${iconStyles[size]}
            `}
          />
          <div
            css={css`
              margin-left: 10px;
              margin-right: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            {children}
          </div>
          {dismissible && (
            <IconButton
              onClick={(e: React.MouseEvent) => (onDismiss ? onDismiss() : () => null)}
              Icon={Dismiss}
              height={12}
              width={12}
              fill={theme.colors.error_dark}
            />
          )}
        </div>
      )}
    </div>
  </div>
);

export default ErrorContainer;
