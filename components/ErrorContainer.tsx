import { css } from '@emotion/core';
import { Error } from './theme/icons';

const ErrorContainer = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div
    css={css`
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `}
  >
    <div
      css={(theme) =>
        css`
          padding: 1rem 2rem;
          border: 1px solid ${theme.colors.error_2};
          border-radius: 5px;
          ${theme.shadow.default};
          ${theme.typography.subheading};
          font-weight: normal;
          line-height: 26px;
          max-width: 600px;
          background-color: ${theme.colors.error_1};
          color: ${theme.colors.accent_dark};
        `
      }
    >
      <h2
        css={css`
          display: flex;
          align-items: center;
          margin: 0.5rem 0 1rem;
          font-size: 24px;
          line-height: 38px;
        `}
      >
        <Error
          height={27}
          width={26}
          style={css`
            padding-right: 15px;
          `}
        />{' '}
        {title}
      </h2>
      {children}
    </div>
  </div>
);

export default ErrorContainer;
