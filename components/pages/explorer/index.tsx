/*
 *
 * Copyright (c) 2021 The Ontario Institute for Cancer Research. All rights reserved
 *
 *  This program and the accompanying materials are made available under the terms of
 *  the GNU Affero General Public License v3.0. You should have received a copy of the
 *  GNU Affero General Public License along with this program.
 *   If not, see <http://www.gnu.org/licenses/>.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 *  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 *  SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 *  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 *  TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 *  OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 *  IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 *  ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

import dynamic from 'next/dynamic';
import urlJoin from 'url-join';

import PageContent from './PageContent';
import PageLayout from '../../PageLayout';

import { RepoFiltersType } from './sqonTypes';
import { getConfig } from '../../../global/config';
import createArrangerFetcher from '../../utils/arrangerFetcher';
import { useEffect, useState } from 'react';
import ErrorNotification from '../../ErrorNotification';
import getConfigError from './getConfigError';
import Loader from '../../Loader';
import { css } from '@emotion/core';
import sleep from '../../utils/sleep';

const Arranger = dynamic(
  () => import('@overture-stack/arranger-components/dist/Arranger').then((comp) => comp.Arranger),
  { ssr: false },
) as any;

export interface PageContentProps {
  sqon: RepoFiltersType;
  selectedTableRows: string[];
  setSelectedTableRows: (id: string) => void;
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
  fetchData?: () => Promise<any>;
}

const arrangerFetcher = createArrangerFetcher({});

const configsQuery = `
  query($field: String!, $index: String!) {
    hasValidConfig(field: $field, index: $index)
  }
`;

const RepositoryPage = () => {
  const {
    NEXT_PUBLIC_ARRANGER_API_URL,
    NEXT_PUBLIC_ARRANGER_GRAPHQL_FIELD,
    NEXT_PUBLIC_ARRANGER_INDEX,
  } = getConfig();
  const [arrangerHasConfig, setArrangerHasConfig] = useState<boolean>(false);
  const [loadingArrangerConfig, setLoadingArrangerConfig] = useState<boolean>(true);

  useEffect(() => {
    fetch(urlJoin(NEXT_PUBLIC_ARRANGER_API_URL, 'graphql'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        variables: {
          field: NEXT_PUBLIC_ARRANGER_GRAPHQL_FIELD,
          index: NEXT_PUBLIC_ARRANGER_INDEX,
        },
        query: configsQuery,
      }),
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Could not validate Arranger server configuration!');
        }
        return res.json();
      })
      .then(async ({ data }) => {
        await setArrangerHasConfig(data?.hasValidConfig);
        // 1s delay so loader doesn't flicker on and off too quickly
        await sleep(1000);
        setLoadingArrangerConfig(false);
      })
      .catch(async (err) => {
        console.warn(err);
        // same as above comment
        await sleep(1000);
        setLoadingArrangerConfig(false);
      });
  }, []);

  const ConfigError = getConfigError({
    hasConfig: arrangerHasConfig,
    index: NEXT_PUBLIC_ARRANGER_INDEX,
    graphqlField: NEXT_PUBLIC_ARRANGER_GRAPHQL_FIELD,
  });

  return (
    <PageLayout subtitle="Data Explorer">
      {loadingArrangerConfig ? (
        <div
          css={(theme) =>
            css`
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              background-color: ${theme.colors.grey_2};
            `
          }
        >
          <Loader />
        </div>
      ) : ConfigError ? (
        <ErrorNotification
          title={'DMS Configuration Error'}
          size="lg"
          styles={`
            flex-direction: column;
            justify-content: center;
            align-items: center;
          `}
        >
          {ConfigError}
        </ErrorNotification>
      ) : (
        <Arranger
          api={arrangerFetcher}
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
