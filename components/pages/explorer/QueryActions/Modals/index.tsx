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

import {
  ChangeEventHandler,
  Dispatch,
  Fragment,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import { useTheme } from 'emotion-theming';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import ModalPortal from '@/components/Modal/Portal';
import Modal from '@/components/Modal';
import { DefaultTheme, DefaultThemeObject } from '@/components/theme';
import { Checkmark, ErrorIcon } from '@/components/theme/icons';

import { QueryModalPayload } from '../types';

import { modalsData } from './constants';
import ErrorNotification from '@/components/ErrorNotification';

const StyledInput = styled('input')`
  ${({ theme }: DefaultThemeObject) => theme.typography.regular}
  box-sizing: border-box;
  display: block;
  line-height: 1.5rem;
  width: 100%;
`;

const QueryModals = ({
  setShowModal,
  modalProps = null,
}: {
  setShowModal: Dispatch<SetStateAction<QueryModalPayload | null>>;
  modalProps: QueryModalPayload | null;
}) => {
  const currentModalData = modalProps && modalsData[modalProps.actionType];
  const [inputValue, setInputValue] = useState('');
  const [inputIsValid, setInputIsValid] = useState('');
  const theme: DefaultTheme = useTheme();

  const closeModal = (event: SyntheticEvent<HTMLButtonElement, Event>) => {
    setInputIsValid('');
    setInputValue('');
    setShowModal(null);
  };

  const handleActionClick = (event: SyntheticEvent<HTMLButtonElement, Event>) => {
    modalProps?.callback?.(inputValue);
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = event.target.value;

    setInputValue(newValue);
    setInputIsValid(modalProps?.inputValidation?.(newValue));
  };

  useEffect(() => {
    modalProps?.currentValue && setInputValue(modalProps?.currentValue);
  }, [modalProps?.currentValue]);

  return (
    currentModalData && (
      <ModalPortal>
        <Modal
          actionButtonText={currentModalData.actionText}
          onActionClick={handleActionClick}
          onCancelClick={closeModal}
          onCloseClick={closeModal}
          showFooter={['confirmation', 'input'].includes(currentModalData.type)}
          title={currentModalData.title}
        >
          {currentModalData.type === 'error' && (
            <ErrorIcon
              fill={theme.colors.error}
              size="15px"
              style={css`
                margin-right: 6px;
              `}
            />
          )}

          {currentModalData.type === 'success' && (
            <Checkmark
              fill={theme.colors.success}
              size="15px"
              style={css`
                margin-right: 6px;
              `}
            />
          )}

          <section>
            {typeof currentModalData.content === 'string' ? (
              <p
                css={css`
                  margin: 0 ${currentModalData.type === 'input' ? '0 1rem' : ''};
                `}
              >
                {currentModalData.content}
              </p>
            ) : (
              currentModalData.content
            )}

            {currentModalData.type === 'input' && (
              <Fragment>
                {inputIsValid && (
                  <ErrorNotification
                    css={css`
                      margin-bottom: 1rem;
                    `}
                    size="sm"
                  >
                    {inputIsValid}
                  </ErrorNotification>
                )}
                <StyledInput value={inputValue} onChange={handleInputChange} />
              </Fragment>
            )}
          </section>
        </Modal>
      </ModalPortal>
    )
  );
};

export default QueryModals;
