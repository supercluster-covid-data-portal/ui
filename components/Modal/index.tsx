/*
 * Copyright (c) 2021 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { Children, ComponentProps, FC, MouseEventHandler, ReactNode, SyntheticEvent } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { useTheme } from 'emotion-theming';

import Button from '@/components/Button';
import { DefaultTheme, DefaultThemeObject } from '@/components/theme';
import Dismiss from '@/components/theme/icons/dismiss';

import Overlay from './Overlay';

const DefaultFooter = ({
  actionButtonText = 'Apply',
  actionDisabled = false,
  cancelText = 'Cancel',
  onActionClick,
  onCancelClick,
}: {
  actionButtonText?: ReactNode;
  actionDisabled?: boolean;
  cancelText?: ReactNode;
  onActionClick?: (event: SyntheticEvent<HTMLButtonElement, Event>) => any;
  onCancelClick?: (event: SyntheticEvent<HTMLButtonElement, Event>) => any;
}) => (
  <ButtonContainer>
    {onCancelClick && <Button onClick={onCancelClick}>{cancelText}</Button>}

    {onActionClick && (
      <Button
        css={css`
          margin-left: 10px;
        `}
        disabled={actionDisabled}
        onClick={onActionClick}
      >
        {actionButtonText}
      </Button>
    )}
  </ButtonContainer>
);

const ButtonContainer = styled('div')`
  display: flex;
  flex-direction: row;
`;

const FocusWrapper = styled('button')`
  align-items: center;
  background: none;
  border: none;
  box-shadow: 0px 0px 4px 0px ${({ theme }: DefaultThemeObject) => theme.colors.secondary_1};
  cursor: pointer;
  display: flex;
  height: 1rem;
  justify-content: center;
  outline: none;
  padding: 0px;
  transition: box-shadow 0.1s ease-in;
  width: 1rem;

  &:focus,
  &:hover {
    box-shadow: 0px 0px 4px 0px ${({ theme }: DefaultThemeObject) => theme.colors.grey_5};
  }
`;

const ModalBody = styled('div')`
  box-sizing: border-box;
  display: flex;
  overflow-y: auto;
  padding: 20px;
  width: 100%;
`;

const ModalCloseButton = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
  const theme: DefaultTheme = useTheme();

  return (
    <FocusWrapper className={className} onClick={onClick}>
      <Dismiss fill={theme.colors.grey_600} size={'10px'} />
    </FocusWrapper>
  );
};

export const ModalContainer = styled('div')`
  ${({ theme }) => theme.typography.regular}
  align-items: space-between;
  background-color: ${({ theme }: DefaultThemeObject) => theme.colors.white};
  border-radius: 3px;
  box-shadow: 0 8px 21px 0 rgba(0, 0, 0, 0.1), 0 6px 12px 0 rgba(0, 0, 0, 0.1);
  color: ${({ theme }: DefaultThemeObject) => theme.colors.grey_800};
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  max-height: 95vh;
  max-width: 776px;
  position: relative;
  width: auto;
`;

const ModalFooter = styled('div')`
  border-top: 1px solid ${({ theme }: DefaultThemeObject) => theme.colors.grey_4};
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 10px 15px;
`;

const ModalTitle = styled('div')`
  align-items: center;
  border-bottom: 1px solid ${({ theme }: DefaultThemeObject) => theme.colors.grey_4};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 15px;

  h1 {
    ${({ theme }) => theme.typography.heading}
    margin: 0;
  }
`;

const ModalComponent: FC<{
  actionButtonText?: ReactNode;
  actionDisabled?: boolean;
  cancelText?: ReactNode;
  Container?: FC;
  Footer?: FC;
  onActionClick?: ComponentProps<typeof Button>['onClick'];
  onCancelClick?: ComponentProps<typeof Button>['onClick'];
  onCloseClick: ComponentProps<typeof FocusWrapper>['onClick'];
  showCloseButton?: boolean;
  showFooter?: boolean;
  showTitle?: boolean;
  title?: ReactNode;
  type?: string;
}> = ({
  actionButtonText,
  actionDisabled,
  cancelText,
  children,
  Container = ModalContainer,
  Footer = DefaultFooter,
  onActionClick,
  onCancelClick,
  onCloseClick = () => {},
  showCloseButton = true,
  showFooter = true,
  showTitle = true,
  title = '',
}) => {
  const hasChildren = Children.toArray(children).filter((node) => node);
  const showModalBody = hasChildren && !(showTitle && !title);
  const showModalFooter = showFooter && (onActionClick || onCancelClick);
  const showModalTitle = showTitle && (title || hasChildren);

  const showEmergencyClose = !(showModalBody || showModalTitle || showModalFooter);

  return (
    <Container>
      {showModalTitle && (
        <ModalTitle>
          {title ? <h1>{title}</h1> : children}

          {showCloseButton && (
            <ModalCloseButton
              css={css`
                margin-left: 50px;
                margin-right: -5px;
              `}
              onClick={onCloseClick}
            />
          )}
        </ModalTitle>
      )}

      {showModalBody && <ModalBody>{children}</ModalBody>}

      {showModalFooter && (
        <ModalFooter>
          <Footer
            actionButtonText={actionButtonText}
            actionDisabled={actionDisabled}
            cancelText={cancelText}
            onActionClick={onActionClick}
            onCancelClick={onCancelClick}
          />
        </ModalFooter>
      )}

      {showEmergencyClose && <ModalCloseButton onClick={onCloseClick} />}
    </Container>
  );
};

const Modal: typeof ModalComponent & { Overlay: typeof Overlay } = (() => {
  const output = ModalComponent as any;
  output.Overlay = Overlay;
  return output;
})();

export default Modal;
