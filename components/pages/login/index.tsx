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

type ProviderType = {
  name: string;
  path: string;
  icon: any;
};

const providers: ProviderType[] = [
  { name: 'Google', path: 'google', icon: GoogleLogo },
  { name: 'ORCiD', path: 'orcid', icon: OrcidLogo },
  { name: 'GitHub', path: 'github', icon: GitHubLogo },
  { name: 'Facebook', path: '', icon: FacebookLogo },
  { name: 'LinkedIn', path: 'linkedin', icon: LinkedInLogo },
];

const LoginPage = () => {
  return (
    <PageLayout>
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
          <span
            css={(theme) => css`
              display: block;
              max-width: 475px;
              ${theme.typography.heading}
              color: ${theme.colors.accent_dark};
              margin: 10px 0;
            `}
          >
            Please choose one of the following log in methods to access your API token for data
            download:
          </span>
          <ul
            css={css`
              max-width: 60%;
              max-height: 400px;
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              row-gap: 15px;
              column-gap: 15px;
              padding-inline-start: 0;
            `}
          >
            {providers.map(({ name, icon, path }) => {
              return (
                <li
                  key={name}
                  css={css`
                    list-style: none;
                  `}
                >
                  <LoginButton Icon={icon} title={`Log in with ${name}`} path={path} />
                </li>
              );
            })}
          </ul>
        </div>
        <div
          css={(theme) => css`
            flex: 2;
            background-color: ${theme.colors.primary};
          `}
        ></div>
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
    </PageLayout>
  );
};

export default LoginPage;
