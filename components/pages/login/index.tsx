import { css } from '@emotion/core';

import PageLayout from '../../PageLayout';
import Illustration from '../../theme/icons/illustration';
import GoogleLogo from '../../theme/icons/google';
import FacebookLogo from '../../theme/icons/facebook';
import GitHubLogo from '../../theme/icons/github';
import OrcidLogo from '../../theme/icons/orcid';
import LinkedInLogo from '../../theme/icons/linkedin';
import { IconProps } from '../../theme/icons/types';

const LoginButton = ({ Icon, title }: { Icon: React.ComponentType<IconProps>; title: string }) => {
  console.log();
  return (
    <a>
      <div
        css={(theme) => css`
          display: flex;
          width: 225px;
          height: 42px;
          border-radius: 5px;
          border: 1px solid ${theme.colors.accent};
          cursor: pointer;
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
  { name: 'Google', path: '', icon: GoogleLogo },
  { name: 'ORCID', path: '', icon: OrcidLogo },
  { name: 'GitHub', path: '', icon: GitHubLogo },
  { name: 'Facebook', path: '', icon: FacebookLogo },
  { name: 'LinkedIn', path: '', icon: LinkedInLogo },
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
          min-width: 1440px;
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
                  <LoginButton Icon={icon} title={`Log in with ${name}`} path={''} />
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
