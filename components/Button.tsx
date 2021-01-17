import React, { ReactNode, ReactNodeArray } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import defaultTheme from './theme';
import { useTheme } from 'emotion-theming';
import theme from './theme';
import { Spinner } from './theme/icons';

const ButtonElement = styled('button')`
  color: ${({ theme }: { theme: typeof defaultTheme }) => css(theme.colors.white)};
  background-color: ${({ theme }: { theme: typeof defaultTheme }) => css(theme.colors.accent)};
  ${({ theme }) => css(theme.typography.subheading2)};
  line-height: 24px;
  border-radius: 5px;
  border: 0px;
  padding: 6px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  &:disabled {
    background-color: ${({ theme }: { theme: typeof defaultTheme }) => css(theme.colors.grey_4)};
    cursor: not-allowed;
    color: ${({ theme }: { theme: typeof defaultTheme }) => css(theme.colors.white)};
    border: 1px solid ${({ theme }: { theme: typeof defaultTheme }) => css(theme.colors.grey_4)};
  }
  &:hover {
  }
`;

const Button = React.forwardRef<
  HTMLButtonElement,
  {
    children?: ReactNode | ReactNodeArray;
    disabled?: boolean;
    onClick?: (
      e: React.SyntheticEvent<HTMLButtonElement>,
    ) => any | ((e: React.SyntheticEvent<HTMLButtonElement>) => Promise<any>);
    /**
     * Use with async onClick handlers to set loading indicator
     */
    isAsync?: boolean;

    /**
     * DOM pass through
     */
    className?: string;
    /**
     * DOM pass through
     */
    id?: string;
    isLoading?: boolean;
    color?: string;
  }
>(
  (
    {
      children,
      onClick = (e) => {},
      disabled = false,
      isAsync = false,
      className,
      id,
      isLoading: controlledLoadingState,
      color,
    },
    ref = React.createRef(),
  ) => {
    const [isLoading, setLoading] = React.useState(false);

    /**
     * controlledLoadingState will allows consumer to control the loading state.
     * Else, that is set by the component internally
     */
    const shouldShowLoading = !!controlledLoadingState || (isLoading && isAsync);

    const onClickFn = async (event: any) => {
      setLoading(true);
      await onClick(event);
      setLoading(false);
    };
    return (
      <ButtonElement
        ref={ref}
        onClick={isAsync ? onClickFn : onClick}
        disabled={disabled || shouldShowLoading}
        className={className}
        // id={id}
      >
        <span
          css={css`
            visibility: ${shouldShowLoading ? 'hidden' : 'visible'};
          `}
        >
          {children}
        </span>
        <span
          css={(theme) => css`
            position: absolute;
            visibility: ${shouldShowLoading ? 'visible' : 'hidden'};
            bottom: 1px;
            fill: ${color || theme.colors.white};
          `}
        >
          <Spinner height={20} width={20} />
        </span>
      </ButtonElement>
    );
  },
);

export default Button;
