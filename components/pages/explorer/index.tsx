import dynamic from 'next/dynamic';
import urlJoin from 'url-join';

import PageContent from './PageContent';
import PageLayout from '../../PageLayout';

import { RepoFiltersType } from './sqonTypes';
import { getConfig } from '../../../global/config';
import createArrangerFetcher from '../../utils/arrangerFetcher';
import { useEffect, useState } from 'react';
import ErrorContainer from '../../ErrorContainer';
import getConfigError from './getConfigError';

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

export type Project = {
  id: string;
  active: boolean;
  indices: [{ id: string; esIndex: string; graphqlField: string }];
};

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

const RepositoryPage = () => {
  const {
    NEXT_PUBLIC_ARRANGER_PROJECT_ID,
    NEXT_PUBLIC_ARRANGER_GRAPHQL_FIELD,
    NEXT_PUBLIC_ARRANGER_INDEX,
  } = getConfig();

  const [availableProjects, setAvailableProjects] = useState<Project[]>([]);
  useEffect(() => {
    const { NEXT_PUBLIC_ARRANGER_API } = getConfig();
    fetch(urlJoin(NEXT_PUBLIC_ARRANGER_API, 'admin/graphql'), {
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
        <ErrorContainer title={'DMS Configuration Error'}>{ConfigError}</ErrorContainer>
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
