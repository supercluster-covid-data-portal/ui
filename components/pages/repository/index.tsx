import dynamic from 'next/dynamic';

import PageContent from './PageContent';
import PageLayout from '../../PageLayout';

import { RepoFiltersType } from './sqonTypes';
import { getConfig } from '../../../global/config';
import { css } from '@emotion/core';
import createArrangerFetcher from '../../utils/arrangerFetcher';
import { useEffect, useState } from 'react';

const Arranger = dynamic(
  () => import('@arranger/components/dist/Arranger').then((comp) => comp.Arranger),
  { ssr: false },
) as any;

export interface PageContentProps {
  sqon: RepoFiltersType;
  selectedTableRows: string[];
  setSelectedTableRows: (id: string) => void;
  projectId: string;
  index: string;
  api: ({
    endpoint,
    body,
    headers,
    method,
  }: {
    endpoint: string;
    body: string;
    headers: any;
    method: string;
  }) => Promise<any>;
  setSQON: (sqon: RepoFiltersType) => void;
  fetchData?: (projectId: string) => Promise<any>;
}

const arrangerFetcher = createArrangerFetcher({});

const projectsQuery = `
  query {
    projects {
      id
      active
      indices {
        id
        esIndex
        graphqlField
      }
    }
  }
`;

type Project = {
  id: string;
  active: boolean;
  indices: [{ id: string; esIndex: string; graphqlField: string }];
};

const ConfigErrorDisplay = ({ children }: { children: React.ReactNode }) => (
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
          padding: 2rem;
          border: 1px solid ${theme.colors.grey_3};
          border-radius: 5px;
          ${theme.shadow.default};
          ${theme.typography.heading};
          max-width: 600px;
        `
      }
    >
      {children}
    </div>
  </div>
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
  const Missing = (
    <span
      css={(theme) =>
        css`
          color: ${theme.colors.error_dark};
        `
      }
    >
      Missing
    </span>
  );
  if (!(projectId && index && graphqlField)) {
    return (
      <span>
        One or more of project ID, Elasticsearch index, and index alias (graphQL field) values
        required by the DMS portal do not exist. Make sure the values are specified in the
        config.yaml file during DMS installation and have been used to create your project in the
        Arranger Admin UI.
        <ul>
          <li>Project ID: {projectId || Missing}</li>
          <li>Alias name: {graphqlField || Missing}</li>
          <li>Elasticsearch index: {index || Missing}</li>
        </ul>
      </span>
    );
  }
  if (!availableProjects.filter((project) => project.active).length) {
    return (
      <span>
        No active projects for the DMS portal exist. Make sure the project specified in the
        config.yaml file during DMS installation has been created in the Arranger Admin UI.
      </span>
    );
  }
  const foundProject =
    availableProjects.length && availableProjects.find((project) => project.id === projectId);
  if (!foundProject) {
    return (
      <span>
        The project ID "{projectId}" configured for the DMS portal does not match any existing
        project. Make sure the project ID specified in the config.yaml file during DMS installation
        has been created in the Arranger Admin UI.
      </span>
    );
  }

  const aliasFromList = foundProject.indices.find((i) => i.id.match(projectId))?.graphqlField;
  const matchesConfiguredAlias = graphqlField === aliasFromList;

  if (!matchesConfiguredAlias) {
    return (
      <div>
        The Elasticsearch alias name (graphQL field) "{aliasFromList}" required by the DMS portal
        for project ID "{projectId}" does not match your configured alias name "{graphqlField}" .
        Make sure the value specified in the config.yaml file during DMS installation has been used
        to create your project in the Arranger Admin UI.
      </div>
    );
  }
  return null;
};

const RepositoryPage = () => {
  const {
    NEXT_PUBLIC_ARRANGER_PROJECT_ID,
    NEXT_PUBLIC_ARRANGER_GRAPHQL_FIELD,
    NEXT_PUBLIC_ARRANGER_INDEX,
  } = getConfig();

  const [availableProjects, setAvailableProjects] = useState<Project[]>([]);
  useEffect(() => {
    fetch(`https://arranger.qa.overture.bio/admin/graphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        variables: {},
        query: projectsQuery,
      }),
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Could not retrieve available projects from Arranger server!');
        }
        return res.json();
      })
      .then(({ data: { projects } }: { data: { projects: Project[] } }) => {
        setAvailableProjects(projects);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  const ConfigError = getConfigError({
    availableProjects,
    projectId: NEXT_PUBLIC_ARRANGER_PROJECT_ID,
    index: NEXT_PUBLIC_ARRANGER_INDEX,
    graphqlField: NEXT_PUBLIC_ARRANGER_GRAPHQL_FIELD,
  });

  return (
    <PageLayout>
      {ConfigError ? (
        <ConfigErrorDisplay>{ConfigError}</ConfigErrorDisplay>
      ) : (
        <Arranger
          api={arrangerFetcher}
          projectId={NEXT_PUBLIC_ARRANGER_PROJECT_ID}
          graphqlField={NEXT_PUBLIC_ARRANGER_GRAPHQL_FIELD}
          index={NEXT_PUBLIC_ARRANGER_INDEX}
          render={(props: PageContentProps) => {
            return <PageContent {...props} />;
          }}
        />
      )}
    </PageLayout>
  );
};

export default RepositoryPage;
