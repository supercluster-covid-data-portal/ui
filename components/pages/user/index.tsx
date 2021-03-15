import { css } from '@emotion/core';
import React from 'react';
import { isEmpty } from 'lodash';
import styled from '@emotion/styled';

import PageLayout from '../../PageLayout';
import { OvertureUser } from '../../theme/icons';
import defaultTheme from '../../theme';
import useAuthContext from '../../../global/hooks/useAuthContext';
import AuthenticatedBadge from './AuthenticatedBadge';
import ApiTokenInfo from './ApiTokenInfo';

const StyledPageLayout = styled(PageLayout)`
  ${({ theme }: { theme: typeof defaultTheme }) =>
    css`
      background-color: ${theme.colors.white};
    `}
`;

const UserComponent = () => {
  const { user } = useAuthContext();
  return (
    <StyledPageLayout subtitle="User Profile & Token">
      <div
        css={css`
          display: flex;
          justify-content: center;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            margin: 1rem 2rem;
            width: 800px;
          `}
        >
          {!isEmpty(user) && (
            <div
              css={(theme) => css`
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                width: 800px;
                margin-top: 1.5rem;
                margin-bottom: 0.5rem;
                padding-bottom: 2.5rem;
                border-bottom: 1px solid ${theme.colors.grey_3};
              `}
            >
              <div
                css={css`
                  display: flex;
                  flex-direction: row;
                `}
              >
                <OvertureUser width={75} height={84} />
                <div
                  css={css`
                    margin-left: 1rem;
                  `}
                >
                  <h1
                    css={(theme) =>
                      css`
                        ${theme.typography.regular};
                        font-size: 30px;
                        line-height: 36px;
                        color: ${theme.colors.accent_dark};
                        margin-bottom: 0.5rem;
                        margin-top: 0.1rem;
                      `
                    }
                  >
                    {`${user?.firstName} ${user?.lastName}`}
                  </h1>
                  <div
                    css={(theme) =>
                      css`
                        ${theme.typography.subheading};
                        color: ${theme.colors.accent_dark};
                        font-weight: normal;
                        padding-left: 0.2rem;
                      `
                    }
                  >
                    {user?.email || ''}
                  </div>
                </div>
              </div>
              <AuthenticatedBadge provider={user?.providerType} />
            </div>
          )}
          {!isEmpty(user) && <ApiTokenInfo />}
        </div>
      </div>
    </StyledPageLayout>
  );
};

export default UserComponent;
