import React from 'react';
import { css } from '@emotion/core';
import { capitalize } from 'lodash';
import { useTheme } from 'emotion-theming';

import { ProviderType } from '../../../global/types';

import defaultTheme from '../../theme';
import {
  GoogleLogo,
  FacebookLogo,
  GitHubLogo,
  OrcidLogo,
  LinkedInLogo,
  Checkmark,
} from '../../theme/icons';

const providerIcons: { [k in ProviderType]: React.ElementType } = {
  GOOGLE: GoogleLogo,
  FACEBOOK: FacebookLogo,
  GITHUB: GitHubLogo,
  LINKEDIN: LinkedInLogo,
  ORCID: OrcidLogo,
};

const AuthenticatedBadge = ({ provider }: { provider?: ProviderType }) => {
  const IconComponent = provider ? providerIcons[provider] : null;
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
        {IconComponent && <IconComponent height={20} width={20} />}
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

export default AuthenticatedBadge;
