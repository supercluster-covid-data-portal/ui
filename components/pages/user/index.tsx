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

const FlexDiv = styled('div')`
  display: flex;
`;

const UserInfoContainer = styled(FlexDiv)`
  ${({ theme }: { theme: typeof defaultTheme }) => css`
    flex-direction: row;
    justify-content: space-between;
    width: 800px;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    padding-bottom: 2.5rem;
    border-bottom: 1px solid ${theme.colors.grey_3};
  `}
`;

const UserTitle = styled('h1')`
  ${({ theme }: { theme: typeof defaultTheme }) => css`
    ${theme.typography.regular};
    font-size: 30px;
    line-height: 36px;
    color: ${theme.colors.accent_dark};
    margin-bottom: 0.5rem;
    margin-top: 0.1rem;
  `}
`;

const UserEmail = styled('div')`
  ${({ theme }: { theme: typeof defaultTheme }) => css`
    ${theme.typography.subheading};
    color: ${theme.colors.accent_dark};
    font-weight: normal;
    padding-left: 0.2rem;
  `}
`;

const UserComponent = () => {
  const { user } = useAuthContext();
  return (
    <StyledPageLayout subtitle="User Profile & Token">
      <FlexDiv
        css={css`
          justify-content: center;
        `}
      >
        <FlexDiv
          css={css`
            flex-direction: column;
            margin: 1rem 2rem;
            width: 800px;
          `}
        >
          {!isEmpty(user) && (
            <UserInfoContainer>
              <FlexDiv
                css={css`
                  flex-direction: row;
                `}
              >
                <OvertureUser width={75} height={84} />
                <div
                  css={css`
                    margin-left: 1rem;
                  `}
                >
                  <UserTitle>{`${user?.firstName} ${user?.lastName}`}</UserTitle>
                  <UserEmail>{user?.email || ''}</UserEmail>
                </div>
              </FlexDiv>
              <AuthenticatedBadge provider={user?.providerType} />
            </UserInfoContainer>
          )}
          {!isEmpty(user) && <ApiTokenInfo />}
        </FlexDiv>
      </FlexDiv>
    </StyledPageLayout>
  );
};

export default UserComponent;
