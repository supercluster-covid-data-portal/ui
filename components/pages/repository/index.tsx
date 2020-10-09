import dynamic from 'next/dynamic';

import PageContent from './PageContent';
import PageLayout from '../../PageLayout';

import { RepoFiltersType } from './sqonTypes';

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

const RepositoryPage = () => {
  return (
    <PageLayout>
      <Arranger
        // TODO: server settings should come from config
        projectId={'dev2'}
        graphqlField={'file'}
        index={'file-centric'}
        render={(props: PageContentProps) => {
          return <PageContent {...props} />;
        }}
      />
    </PageLayout>
  );
};

export default RepositoryPage;
