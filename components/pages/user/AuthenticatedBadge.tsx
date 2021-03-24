import React from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';

import defaultTheme from '../../theme';
import { Checkmark } from '../../theme/icons';
import { ProviderType } from '../../../global/types';
import providerMap from '../../../global/utils/providerTypeMap';

const AuthenticatedBadge = ({ provider }: { provider: ProviderType }) => {
  const IconComponent = providerMap[provider].icon;
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
        Authenticated with {providerMap[provider].displayName}
      </span>
      <Checkmark height={15} width={15} fill={theme.colors.primary} />
    </div>
  );
};

export default AuthenticatedBadge;
