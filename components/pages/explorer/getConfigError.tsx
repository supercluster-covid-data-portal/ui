import { ReactNode } from 'react';
import { css } from '@emotion/core';

import { Checkmark, Warning } from '../../theme/icons';
import theme from '../../theme';
import StyledLink from '../../Link';

import { getConfig } from '../../../global/config';
import { Project } from '.';

const ArrangerAdminUILink = () => {
  const { NEXT_PUBLIC_ARRANGER_ADMIN_UI } = getConfig();
  return (
    <StyledLink href={NEXT_PUBLIC_ARRANGER_ADMIN_UI} target="_blank">
      Arranger Admin UI
    </StyledLink>
  );
};

const ListItem = ({
  Icon,
  value,
  fieldName,
}: {
  Icon?: ReactNode;
  value: string;
  fieldName: string;
}) => (
  <li
    css={(theme) =>
      css`
        display: flex;
        align-items: center;
        ${value === 'Missing' &&
        css`
          color: ${theme.colors.error_dark};
        `}
      `
    }
  >
    {Icon || <Checkmark height={16} width={16} fill={theme.colors.primary} />}
    <span
      css={css`
        padding-left: 6px;
      `}
    >
      {fieldName}:{' '}
      <span
        css={css`
          font-weight: bold;
        `}
      >
        {value}
      </span>
    </span>
  </li>
);

const WarningListItem = ({ fieldName }: { fieldName: string }) => (
  <ListItem Icon={<Warning height={16} width={16} />} fieldName={fieldName} value={'Missing'} />
);

const getConfigError = ({
  availableProjects,
  projectId,
  index,
  graphqlField,
}: {
  availableProjects: Project[];
  projectId: string;
  index: string;
  graphqlField: string;
}) => {
  if (!(projectId && index && graphqlField)) {
    return (
      <span>
        One or more of the following values required by the DMS portal do not exist. Please make
        sure the values are specified in the DMS{' '}
        <span
          css={css`
            font-weight: bold;
          `}
        >
          config.yaml
        </span>{' '}
        file during installation and have been used to create your project in the{' '}
        <ArrangerAdminUILink />.
        <ul
          css={css`
            list-style-type: none;
            padding-left: 0px;
          `}
        >
          {[
            { field: 'Project ID', value: projectId },
            { field: 'Alias name', value: graphqlField },
            { field: 'Elasticsearch index', value: index },
          ].map(({ field, value }) => {
            return value ? (
              <ListItem key={`${field}-${value}`} fieldName={field} value={value} />
            ) : (
              <WarningListItem key={`${field}-${value}`} fieldName={field} />
            );
          })}
        </ul>
      </span>
    );
  }

  if (!availableProjects.filter((project) => project.active).length) {
    return (
      <span>
        No active projects for the DMS portal exist. Please make sure the project specified in the
        DMS{' '}
        <span
          css={css`
            font-weight: bold;
          `}
        >
          config.yaml
        </span>{' '}
        file during installation has been created in the <ArrangerAdminUILink />.
      </span>
    );
  }

  const foundProject =
    availableProjects.length && availableProjects.find((project) => project.id === projectId);

  if (!foundProject) {
    return (
      <span>
        The project ID:{' '}
        <span
          css={css`
            font-weight: bold;
          `}
        >
          "{projectId}"
        </span>{' '}
        configured for the DMS portal does not match any existing project. Please make sure the
        project ID specified in the DMS{' '}
        <span
          css={css`
            font-weight: bold;
          `}
        >
          config.yaml
        </span>{' '}
        file during installation has been created in the <ArrangerAdminUILink />.
      </span>
    );
  }

  const aliasFromList = foundProject.indices.find((i) => i.id.match(projectId))?.graphqlField;
  const matchesConfiguredAlias = graphqlField === aliasFromList;

  if (!matchesConfiguredAlias) {
    return (
      <div>
        The Elasticsearch alias name (graphQL field):{' '}
        <span
          css={css`
            font-weight: bold;
          `}
        >
          "{aliasFromList}"
        </span>{' '}
        required by the DMS portal for project ID:{' '}
        <span
          css={css`
            font-weight: bold;
          `}
        >
          "{projectId}"
        </span>{' '}
        does not match your configured alias name:{' '}
        <span
          css={css`
            font-weight: bold;
          `}
        >
          "{graphqlField}"
        </span>
        . Please make sure the value specified in the DMS{' '}
        <span
          css={css`
            font-weight: bold;
          `}
        >
          config.yaml
        </span>{' '}
        file during installation has been used to create your project in the <ArrangerAdminUILink />
        .
      </div>
    );
  }
};

export default getConfigError;
