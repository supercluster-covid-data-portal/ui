import { createRef, ReactElement, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { css } from '@emotion/core';

import Modal from '.';

const fillAvailableWidth = css`
  width: -webkit-fill-available;
  width: -moz-available;
  min-width: -webkit-fill-available;
  min-width: -moz-available;
`;

const fillAvailableHeight = css`
  height: -webkit-fill-available;
  height: -moz-available;
  min-height: -webkit-fill-available;
  min-height: -moz-available;
`;

const modalPortalRef = createRef<HTMLDivElement>();

const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
};

export const ModalPortal = ({ children }: { children: ReactElement }) => {
  const ref = modalPortalRef.current;
  const mounted = useMounted();
  return ref
    ? ReactDOM.createPortal(
        <div
          id="modalContainer"
          css={css`
            transition: all 0.2s;
            opacity: ${mounted ? 1 : 0};
          `}
        >
          <Modal.Overlay
            css={css`
              ${fillAvailableWidth}
              ${fillAvailableHeight}
              @media (min-width: 768px) {
                width: 100vw;
                height: 100vh;
              }
            `}
          >
            {children}
          </Modal.Overlay>
        </div>,
        ref,
      )
    : null;
};

export default ModalPortal;

export const ModalPortalProvider = () => (
  <div
    css={css`
      position: fixed;
      left: 0px;
      top: 0px;
      z-index: 9999;
      ${fillAvailableWidth}
    `}
    ref={modalPortalRef}
  />
);
