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

import { useEffect, useState, useRef, SyntheticEvent, ReactNode, MouseEventHandler } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { useTheme } from 'emotion-theming';

import { DefaultTheme, DefaultThemeObject } from '@/components/theme';
import { ChevronDown } from '@/components/theme/icons';

import Button from '../Button';

const Dropdown = ({
  children,
  className,
  data,
  disabled,
  onClick,
  title,
}: {
  children?: ReactNode | ReactNode[];
  className?: string;
  data: any[];
  disabled?: boolean;
  onClick?: (event?: SyntheticEvent<HTMLButtonElement, Event>) => any;
  title?: string;
}) => {
  const [open, setOpen] = useState(false);
  const theme: DefaultTheme = useTheme();
  const node: any = useRef();

  const hasData = data?.length > 0;

  const handleClickOnButton = async (event: SyntheticEvent<HTMLButtonElement, Event>) => {
    await new Promise((resolve) => resolve(open || onClick?.(event)));
    setOpen(!open);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (node.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const preventEvent: MouseEventHandler<HTMLLIElement> = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    (disabled || !hasData) && setOpen(false);
  }, [disabled, hasData]);

  return (
    <div className={className}>
      <Button
        disabled={disabled || !hasData}
        onClick={handleClickOnButton}
        ref={node}
        title={title}
      >
        {children}
        {open ? (
          <ChevronDown
            fill={theme.colors.white}
            size="11px"
            style={css`
              margin-left: 6px;
              /* margin-right: -6px; */
              transform: rotate(180deg) translateY(-2px);
            `}
          />
        ) : (
          <ChevronDown
            fill={theme.colors.white}
            size="11px"
            style={css`
              margin-left: 6px;
              /* margin-right: -6px; */
              transform: translateY(1px);
            `}
          />
        )}

        {open && (
          <ul
            css={css`
              background: ${theme.colors.white};
              box-shadow: 0 8px 21px 0 rgba(0, 0, 0, 0.1), 0 6px 12px 0 rgba(0, 0, 0, 0.1);
              color: ${theme.colors.grey_800};
              list-style: none;
              margin: 0;
              max-width: 300px;
              min-width: 100%;
              padding: 2px 0 1px;
              position: absolute;
              right: 0;
              top: 90%;
              z-index: 666;

              li {
                box-sizing: border-box;
                height: fit-content;
                padding: 0 8px;
                width: 100%;
              }
            `}
          >
            {data.map((dataItem: ReactNode, index) => (
              <li
                css={css`
                  cursor: default;
                  max-width: 300px;

                  &:focus,
                  &:hover {
                    background: ${theme.colors.grey_500};
                  }
                `}
                key={index}
                onClick={preventEvent}
              >
                {dataItem}
              </li>
            ))}
          </ul>
        )}
      </Button>
    </div>
  );
};

export default Dropdown;
