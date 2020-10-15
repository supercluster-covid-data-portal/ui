import dynamic from 'next/dynamic';

import PageContent from './PageContent';
import PageLayout from '../../PageLayout';

import { RepoFiltersType } from './sqonTypes';
import { getConfig } from '../../../global/config';
import { css } from '@emotion/core';
import createArrangerFetcher from '../../utils/arrangerFetcher';

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

const RepositoryPage = () => {
  const { ARRANGER_PROJECT_ID, ARRANGER_GRAPHQL_FIELD, ARRANGER_INDEX } = getConfig();

  return (
    <PageLayout>
      {/* TODO: arranger config error handling tbd */}
      {!(ARRANGER_PROJECT_ID && ARRANGER_GRAPHQL_FIELD && ARRANGER_INDEX) ? (
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
                ${theme.typography.subheading}
              `
            }
          >
            Arranger is missing configuration values. Please check your ".env" file.
            <ul>
              <li>Project ID: {ARRANGER_PROJECT_ID || 'missing'}</li>
              <li>GraphQL Field: {ARRANGER_GRAPHQL_FIELD || 'missing'}</li>
              <li>Index: {ARRANGER_INDEX || 'missing'}</li>
            </ul>
          </div>
        </div>
      ) : (
        <Arranger
          api={arrangerFetcher}
          projectId={ARRANGER_PROJECT_ID}
          graphqlField={ARRANGER_GRAPHQL_FIELD}
          index={ARRANGER_INDEX}
          render={(props: PageContentProps) => {
            return <PageContent {...props} />;
          }}
        />
      )}
    </PageLayout>
  );
};

export default RepositoryPage;
