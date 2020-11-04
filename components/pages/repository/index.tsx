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
  const {
    NEXT_PUBLIC_ARRANGER_PROJECT_ID,
    NEXT_PUBLIC_ARRANGER_GRAPHQL_FIELD,
    NEXT_PUBLIC_ARRANGER_INDEX,
  } = getConfig();

  return (
    <PageLayout>
      {/* TODO: arranger config error handling tbd */}
      {!(
        NEXT_PUBLIC_ARRANGER_PROJECT_ID &&
        NEXT_PUBLIC_ARRANGER_GRAPHQL_FIELD &&
        NEXT_PUBLIC_ARRANGER_INDEX
      ) ? (
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
              <li>Project ID: {NEXT_PUBLIC_ARRANGER_PROJECT_ID || 'missing'}</li>
              <li>GraphQL Field: {NEXT_PUBLIC_ARRANGER_GRAPHQL_FIELD || 'missing'}</li>
              <li>Index: {NEXT_PUBLIC_ARRANGER_INDEX || 'missing'}</li>
            </ul>
          </div>
        </div>
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
