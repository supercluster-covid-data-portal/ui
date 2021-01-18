import { css, Global } from '@emotion/core';
import React from 'react';
import { capitalize, has, isEmpty, sample, set } from 'lodash';
import { useTheme } from 'emotion-theming';

import PageLayout from '../../PageLayout';
import {
  GoogleLogo,
  FacebookLogo,
  GitHubLogo,
  OrcidLogo,
  LinkedInLogo,
  OvertureUser,
  Checkmark,
} from '../../theme/icons';

import defaultTheme from '../../theme';
import theme from '../../theme';
import Button from '../../Button';
import StyledLink from '../../Link';
import { Tooltip } from 'react-tippy';
import styled from '@emotion/styled';

type ProviderType = 'GOOGLE' | 'FACEBOOK' | 'GITHUB' | 'LINKEDIN' | 'ORCID';
type UserType = 'ADMIN' | 'USER';
type UserStatus = 'APPROVED' | 'PENDING' | 'DISABLED' | 'REJECTED';
type Language = 'English' | 'French' | 'Spanish';

interface ApiToken {
  expiryDate: string;
  isRevoked: boolean;
  issueDate: string;
  name: string;
  scope: string[];
}

interface User {
  id: string;
  email: string;
  type: UserType;
  status: UserStatus;
  firstName: string;
  lastName: string;
  createdAt: string;
  lastLogin: string;
  preferredLanguage?: Language;
  providerType: ProviderType;
  providerSubjectId: string;
}

const providerIcons: { [k in ProviderType]: React.ElementType } = {
  GOOGLE: GoogleLogo,
  FACEBOOK: FacebookLogo,
  GITHUB: GitHubLogo,
  LINKEDIN: LinkedInLogo,
  ORCID: OrcidLogo,
};

// for testing ui until auth hookup is ready
// user info will come from jwt
const sampleToken: ApiToken = {
  name: 'f4b7ca22-aaaa-4455-86ed-ec2fed727e72',
  scope: ['Test-Policy.WRITE'],
  expiryDate: '2021-02-14T15:58:37.151+0000',
  issueDate: '2021-01-15T15:58:37.151+0000',
  isRevoked: false,
};
const sampleUser: User = {
  id: 'aaaabbbb-cccc-dddd-eeee-ffffgggg',
  email: 'user@example.com',
  firstName: 'User',
  lastName: 'Example',
  providerType: 'GOOGLE',
  providerSubjectId: 'prov-subj-id-0123',
  status: 'APPROVED',
  type: 'USER',
  createdAt: '2020-02-14T15:58:37.151+0000',
  lastLogin: '2020-02-14T15:58:37.151+0000',
};

const AuthenticatedBadge = ({ provider }: { provider: ProviderType }) => {
  const IconComponent = providerIcons[provider];
  const theme: typeof defaultTheme = useTheme();
  return (
    <div
      css={(theme) =>
        css`
          width: 235px;
          max-height: 30px;
          border: 1px solid ${theme.colors.grey_5};
          border-radius: 5px;
          background-color: ${theme.colors.white};
          ${theme.typography.data};
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2px 7px 0;
        `
      }
    >
      <span
        css={(theme) =>
          css`
            border-right: 1px solid ${theme.colors.grey_5};
            padding: 0 10px 0 0;
          `
        }
      >
        <IconComponent height={20} width={20} />
      </span>
      <span
        css={(theme) => css`
          ${theme.typography.data};
          color: ${theme.colors.accent_dark};
        `}
      >
        Authenticated with {capitalize(provider)}
      </span>
      <Checkmark height={15} width={15} fill={theme.colors.primary} />
    </div>
  );
};

const TooltipContainer = styled('div')`
  ${css(theme.typography.label as any)}
  background: ${theme.colors.grey_6};
  border-radius: 2px;
  padding: 2px 4px;
  color: white;
  font-weight: normal;
  margin-bottom: 10%;
  &:before {
    content: '';
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    pointer-events: none;
    right: 50%;
    top: 79%;
    border-top-color: ${theme.colors.grey_6};
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    margin-right: -5px;
  }
`;

const ApiTokenInfo = ({ apiToken }: { apiToken: ApiToken | null }) => {
  const [isCopyingToken, setIsCopyingToken] = React.useState(false);
  const [copySuccess, setCopySuccess] = React.useState(false);

  const sleep = (time: number = 2000) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve('');
      }, time);
    });

  const copyApiToken = (text: string) => {
    setIsCopyingToken(true);
    navigator.clipboard
      .writeText(text)
      .then(async () => {
        await setIsCopyingToken(false);
        await setCopySuccess(true);
        await sleep();
        setCopySuccess(false);
      })
      .catch((err) => console.warn('Failed to copy token!'));
  };

  const parseExpiry = (exp: string) => {
    const expFromTodayMs = Date.parse(exp) - Date.now();
    return expFromTodayMs || 0;
  };

  const getDayValue = (exp: number) => {
    // round or floor?
    const days = Math.round(exp / 1000 / 60 / 60 / 24);
    return `Expires in: ${days} days`;
  };

  const parsedExpiry: number = apiToken ? parseExpiry(apiToken?.expiryDate) : 0;
  const tokenIsExpired: boolean = has(apiToken, 'expiryDate') && parsedExpiry <= 0;

  return (
    <div
      css={css`
        width: 600px;
      `}
    >
      <h2
        css={(theme) =>
          css`
            ${theme.typography.regular};
            font-size: 24px;
            line-height: 40px;
            color: ${theme.colors.accent_dark};
          `
        }
      >
        API Token
      </h2>
      <ol
        css={(theme) =>
          css`
            ${theme.typography.subheading};
            font-weight: normal;
            color: ${theme.colors.accent_dark};
            margin-bottom: 2rem;
          `
        }
      >
        <li>Your API token is used to download controlled access data.</li>
        <li>
          Your API token is associated with your user credentials and should <strong>NEVER</strong>{' '}
          be shared with anyone.
        </li>
        <li>When you generate a new token, all previous tokens become invalid.</li>
        <li>Expired and revoked tokens also become invalid.</li>
      </ol>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          margin-bottom: 10px;
        `}
      >
        <Button
          css={css`
            margin-right: 10px;
          `}
        >
          Generate New Token
        </Button>
        <Button
          disabled={isEmpty(apiToken) || tokenIsExpired}
          isAsync
          css={(theme) =>
            css`
              background-color: ${theme.colors.white};
              color: ${theme.colors.accent_dark};
              border: 1px solid ${theme.colors.grey_5};
              &:hover {
                background-color: ${theme.colors.accent_1};
              }
            `
          }
        >
          Revoke Token
        </Button>
      </div>
      <div
        css={css`
          position: relative;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin-bottom: 2rem;
          margin-top: 1rem;
        `}
      >
        <div
          css={(theme) =>
            css`
              border: 1px solid ${theme.colors.grey_5};
              border-radius: 5px 0px 0px 5px;
              border-right: 0px;
              color: ${isEmpty(apiToken) ? theme.colors.grey_6 : theme.colors.black};
              width: 100%;
              display: flex;
              align-items: center;
              padding-left: 5px;
            `
          }
        >
          {!isEmpty(apiToken) && (
            <div
              css={(theme) =>
                css`
                  color: ${theme.colors.white};
                  border-radius: 6px;
                  padding: 3px 8px;
                  margin-right: 5px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  ${theme.typography.label}
                  ${tokenIsExpired
                    ? `background-color: ${theme.colors.error_dark}`
                    : `background-color: ${theme.colors.grey_6};`}
                `
              }
            >
              {tokenIsExpired ? 'Expired' : getDayValue(parsedExpiry)}
            </div>
          )}
          <span
            css={css`
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              ${theme.typography.subheading}
              font-weight: normal;
              padding-right: 5px;
              padding-left: 5px;
              ${tokenIsExpired ? 'opacity: 0.3' : ''}
            `}
          >
            {apiToken?.name || 'You have no API token...'}
          </span>
        </div>
        <>
          <Global
            styles={css`
              .tippy-popper .leave {
                opacity: 0;
              }
            `}
          />
          <Tooltip
            unmountHTMLWhenHide
            open={copySuccess}
            arrow
            html={<TooltipContainer id="tooltip">Copied!</TooltipContainer>}
            position="top"
          >
            <Button
              disabled={isEmpty(apiToken) || isCopyingToken || tokenIsExpired}
              css={() =>
                css`
                  border-radius: 0px 5px 5px 0px;
                  width: 69px;
                  height: 36px;
                  position: relative;
                `
              }
              onClick={() =>
                apiToken?.name && !tokenIsExpired ? copyApiToken(apiToken.name) : null
              }
            >
              <span
                css={css`
                  position: absolute;
                  top: 8px;
                  left: 24px;
                  visibility: ${copySuccess ? 'visible' : 'hidden'};
                `}
              >
                <Checkmark width={20} height={20} fill={theme.colors.white} />
              </span>
              <span
                css={css`
                  visibility: ${copySuccess ? 'hidden' : 'visible'};
                `}
              >
                Copy
              </span>
            </Button>
          </Tooltip>
        </>
      </div>

      <span
        css={(theme) =>
          css`
            ${theme.typography.subheading};
            font-weight: normal;
            color: ${theme.colors.accent_dark};
          `
        }
      >
        For more information, please read the{' '}
        <StyledLink href={``}>instructions on how to download data</StyledLink>.
      </span>
    </div>
  );
};

const User = () => {
  return (
    <PageLayout backgroundColor={theme.colors.white}>
      <div
        css={() =>
          css`
            margin: 1rem 20rem;
            display: flex;
            flex-direction: column;
          `
        }
      >
        <div
          css={css`
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
                {`${sampleUser.firstName} ${sampleUser.lastName}`}
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
                {sampleUser.email || ''}
              </div>
            </div>
          </div>
          <AuthenticatedBadge provider={sampleUser.providerType} />
        </div>
        <ApiTokenInfo apiToken={sampleToken} />
      </div>
    </PageLayout>
  );
};

export default User;
