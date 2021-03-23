import { css } from '@emotion/core';
import urlJoin from 'url-join';

import PageLayout from '../../PageLayout';
import {
  GoogleLogo,
  FacebookLogo,
  GitHubLogo,
  OrcidLogo,
  LinkedInLogo,
  Illustration,
} from '../../theme/icons';

import { IconProps } from '../../theme/icons/types';
import { getConfig } from '../../../global/config';

import { useRouter } from 'next/router';
import useAuthContext from '../../../global/hooks/useAuthContext';
import { has } from 'lodash';
import usePageContext from '../../../global/hooks/usePageContext';
import { trim } from 'lodash';
import ErrorNotification from '../../ErrorNotification';

const LoginButton = ({
  Icon,
  title,
  path,
}: {
  Icon: React.ComponentType<IconProps>;
  title: string;
  path: string;
}) => {
  const { NEXT_PUBLIC_EGO_API_ROOT, NEXT_PUBLIC_EGO_CLIENT_ID } = getConfig();
  const url = `${urlJoin(
    NEXT_PUBLIC_EGO_API_ROOT,
    '/oauth/login',
    path,
  )}?client_id=${NEXT_PUBLIC_EGO_CLIENT_ID}`;
  const disabled = !path;
  return (
    <a
      href={url}
      css={css`
        text-decoration: none;
      `}
    >
      <div
        css={(theme) => css`
          display: flex;
          width: 225px;
          height: 42px;
          border-radius: 5px;
          border: 1px solid ${theme.colors.accent};
          cursor: ${disabled ? 'not-allowed' : 'pointer'};
          opacity: ${disabled ? 0.4 : 1};
          &:hover {
            border: 1px solid ${theme.colors.accent_dark};
          }
        `}
      >
        <span
          css={css`
            display: flex;
            flex: 1;
            justify-content: center;
            align-items: center;
          `}
        >
          <Icon width={20} height={20} />
        </span>
        <span
          css={(theme) =>
            css`
              display: flex;
              flex: 4;
              justify-content: center;
              align-items: center;
              background-color: ${theme.colors.accent};
              color: ${theme.colors.white};
              ${theme.typography.button}
              border-radius: 0 3px 3px 0;
              &:hover {
                background-color: ${theme.colors.accent_dark};
                color: ${theme.colors.white};
              }
            `
          }
        >
          {title}
        </span>
      </div>
    </a>
  );
};

enum ProviderType {
  GOOGLE = 'GOOGLE',
  ORCID = 'ORCID',
  LINKEDIN = 'LINKEDIN',
  GITHUB = 'GITHUB',
  // FACEBOOK = 'FACEBOOK'
}

type ProviderDetail = {
  displayName: string;
  path: string;
  icon: any;
};
type ProviderMap = { [k in ProviderType]: ProviderDetail };

const providerMap: ProviderMap = {
  [ProviderType.GOOGLE]: { displayName: 'Google', path: 'google', icon: GoogleLogo },
  [ProviderType.ORCID]: { displayName: 'ORCiD', path: 'orcid', icon: OrcidLogo },
  [ProviderType.GITHUB]: { displayName: 'GitHub', path: 'github', icon: GitHubLogo },
  [ProviderType.LINKEDIN]: { displayName: 'LinkedIn', path: 'linkedin', icon: LinkedInLogo },
  // Facebook will be hidden until provider implementation is fixed in Ego https://github.com/overture-stack/ego/issues/555
  // [ProviderType.FACEBOOK]: { displayName: 'Facebook', path: '', icon: FacebookLogo },
};

const LoginPage = () => {
  const { query } = usePageContext();
  const { NEXT_PUBLIC_SSO_PROVIDERS } = getConfig();

  const configuredProviders = NEXT_PUBLIC_SSO_PROVIDERS.length
    ? NEXT_PUBLIC_SSO_PROVIDERS.split(',').map((p: string) => trim(p))
    : [];
  // typing p arg as 'any' because typescript complains with 'string'
  // check configured providers are valid ProviderTypes
  const providers: ProviderDetail[] = configuredProviders
    .filter((p: any) => Object.values(ProviderType).includes(p))
    .map((provider: string) => providerMap[provider as ProviderType]);

  return (
    <PageLayout subtitle="Login">
      <div
        css={css`
          display: flex;
          flex: 1;
          flex-direction: row;
          position: relative;
        `}
      >
        <div
          css={(theme) =>
            css`
              display: flex;
              flex: 3;
              background-color: ${theme.colors.white};
              flex-direction: column;
              justify-content: center;
              padding-left: 5rem;
            `
          }
        >
          <h1
            css={(theme) =>
              css`
                ${theme.typography.heading}
                font-size: 40px;
                line-height: 0;
                color: ${theme.colors.accent_dark};
              `
            }
          >
            Log in
          </h1>
          {query.session_expired && (
            <div
              css={css`
                height: 70px;
                margin: 1rem 0;
              `}
            >
              <ErrorNotification size="md" title="Session Expired">
                Your session has expired. Please log in.
              </ErrorNotification>
            </div>
          )}
          <span
            css={(theme) => css`
              display: block;
              max-width: 475px;
              ${theme.typography.heading}
              color: ${theme.colors.accent_dark};
              margin: 10px 0;
              font-weight: normal;
            `}
          >
            Please choose one of the following log in methods to access your API token for data
            download:
          </span>
          {providers.length ? (
            <ul
              css={css`
                width: 400px;
                max-height: 400px;
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                row-gap: 15px;
                column-gap: 15px;
                padding-inline-start: 0;
              `}
            >
              {providers.map(({ displayName, icon, path }) => {
                return (
                  <li
                    key={displayName}
                    css={css`
                      list-style: none;
                    `}
                  >
                    <LoginButton Icon={icon} title={`Log in with ${displayName}`} path={path} />
                  </li>
                );
              })}
            </ul>
          ) : (
            <div
              css={css`
                height: 50px;
                width: 400px;
              `}
            >
              <ErrorNotification size="md" title="No Configured Providers">
                No identity providers have been configured. Please check you dms configuration file.
              </ErrorNotification>
            </div>
          )}
        </div>
        <div
          css={css`
            display: flex;
            flex: 2;
            @media screen and (max-width: 1250px) {
              display: none;
            }
          `}
        >
          <div
            css={(theme) => css`
              flex: 1;
              background-color: ${theme.colors.primary};
            `}
          />
          <div
            css={css`
              position: absolute;
              right: 190px;
              top: 50px;
            `}
          >
            <Illustration width={559} height={538} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LoginPage;
