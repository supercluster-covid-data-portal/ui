import { css } from '@emotion/core';

// TODO: this is a placeholder Loader
const Loader = () => {
  return (
    <div
      css={(theme) => css`
        border: 14px solid ${theme.colors.grey_3};
        border-top: 14px solid ${theme.colors.secondary_dark};
        border-radius: 50%;
        width: 120px;
        height: 120px;
        animation: spin 2s linear infinite;

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}
    />
  );
};

export default Loader;
