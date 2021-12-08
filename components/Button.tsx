/*
 *
 * Copyright (c) 2021 The Ontario Institute for Cancer Research. All rights reserved
 *
 *  This program and the accompanying materials are made available under the terms of
 *  the GNU Affero General Public License v3.0. You should have received a copy of the
 *  GNU Affero General Public License along with this program.
 *   If not, see <http://www.gnu.org/licenses/>.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 *  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 *  SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 *  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 *  TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 *  OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 *  IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 *  ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

import React, { ReactNode, ReactNodeArray } from 'react';
import { css } from '@emotion/core';
import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';

import { DefaultColors, DefaultThemeObject } from './theme';
import { Spinner } from './theme/icons';

const ButtonElement = styled('button', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'variant',
})`
  ${({ theme, variant }: DefaultThemeObject & { variant?: 'accent' }) => css`
    color: ${theme.colors.white};
    background-color: ${variant ? theme.colors[variant] : theme.colors.primary};
    ${theme.typography.button};
    line-height: 24px;
    border-radius: 5px;
    border: 1px solid ${variant ? theme.colors[variant] : theme.colors.primary};
    padding: 6px 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;

    &:hover {
      background-color: ${variant
        ? theme.colors[`${variant}_light` as DefaultColors]
        : theme.colors.primary_light};
    }

    &:disabled,
    &:disabled:hover {
      background-color: ${theme.colors.grey_400};
      border: 1px solid ${theme.colors.grey_400};
      color: ${theme.colors.grey_600};
      cursor: not-allowed;

      path {
        fill: ${theme.colors.grey_600};
      }
    }
  `}
`;

const Button = React.forwardRef<
  HTMLButtonElement,
  {
    children?: ReactNode | ReactNodeArray;
    disabled?: boolean;
    onClick?: (
      e: React.SyntheticEvent<HTMLButtonElement>,
    ) => any | ((e: React.SyntheticEvent<HTMLButtonElement>) => Promise<any>);
    isAsync?: boolean;
    className?: string;
    isLoading?: boolean;
    title?: string;
    variant?: 'accent';
  }
>(
  (
    {
      children,
      onClick = (e) => {},
      disabled = false,
      isAsync = false,
      className,
      isLoading: controlledLoadingState,
      title = '',
      variant,
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
        title={title}
        variant={variant}
      >
        <span
          css={css`
            visibility: ${shouldShowLoading ? 'hidden' : 'visible'};
          `}
        >
          {children}
        </span>

        {isAsync && (
          <span
            css={(theme) => css`
              position: absolute;
              visibility: ${shouldShowLoading ? 'visible' : 'hidden'};
              bottom: 1px;
            `}
          >
            <Spinner height={20} width={20} />
          </span>
        )}
      </ButtonElement>
    );
  },
);

export default Button;
