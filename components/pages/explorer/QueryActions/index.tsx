/*
 * Copyright (c) 2021 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import {
  Fragment,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { useRouter } from 'next/router';
import urlJoin from 'url-join';

import Button from '@/components/Button';
import { DefaultTheme } from '@/components/theme';
import { SaveIcon } from '@/components/theme/icons';
import useAuthContext from '@/global/hooks/useAuthContext';

import { RepoFiltersType } from '../sqonTypes';

import QueryModals from './Modals';
import { QueryModalPayload } from './types';
import useQueryStorage from './utils';
import Wrapper from './Wrapper';
import filtersToName from './utils/filtersToName';

// TODO: pass token in credentials rather than auth bearer
const QueryActions = ({ sqon }: { sqon: RepoFiltersType }) => {
  const router = useRouter();
  const theme: DefaultTheme = useTheme();
  const [currentQuery, setCurrentQuery] = useState<string>(
    // app base URL on first render
    urlJoin(window.location.origin, window.location.pathname),
  );
  const [currentQueryLabel, setCurrentQueryLabel] = useState<string>('');
  const [firstRender, setFirstRender] = useState<boolean>(true);
  const [hasQueryToStore, setHasQueryToStore] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<QueryModalPayload | null>(null);

  const { token = '', user } = useAuthContext();
  const { callQueryStorage, checkExistingQueries, storedQueries } = useQueryStorage({
    token,
    userId: user?.id,
  });

  const getQueries = useCallback(() => {
    return callQueryStorage();
  }, []);

  const saveQuery = (event: SyntheticEvent<HTMLButtonElement, Event>) => {
    setShowModal({
      actionType: 'saveQuery',
      callback: (label) => {
        const data = {
          label,
          url: currentQuery,
        };

        callQueryStorage({
          data,
          method: 'POST',
        })
          .then((data) => {
            if (data) {
              return setShowModal({
                actionType: 'saveQuery_success',
              });
            }

            throw Error('No data in the response from saving');
          })
          .catch((error) => {
            setShowModal({
              actionType: 'saveQuery_error',
            });

            console.error(error);
          });
      },
      currentValue: currentQueryLabel,
      inputValidation: (newLabel) =>
        checkExistingQueries(newLabel)
          ? 'This label has already been used for a different query'
          : '',
    });
  };

  useEffect(() => {
    token && firstRender && getQueries().then(() => setFirstRender(false));
  }, [token]);

  useEffect(() => {
    const currentUrl = window.location.href;
    const currentQueryLabel = filtersToName({ filters: sqon });
    const queryExists = checkExistingQueries(currentQueryLabel, currentUrl);

    setHasQueryToStore(!!sqon && !queryExists);
    setCurrentQuery(currentUrl);
    setCurrentQueryLabel(currentQueryLabel);
  }, [router.asPath]);

  return (
    <Wrapper>
      {token && (
        <Fragment>
          <Button
            disabled={!hasQueryToStore}
            onClick={saveQuery}
            title={
              hasQueryToStore
                ? 'Save this query'
                : sqon
                ? 'This query was already saved'
                : "You haven't selected any filters yet"
            }
          >
            <SaveIcon
              fill={theme.colors.white}
              size="10px"
              style={css`
                margin-right: 5px;
              `}
            />
            Save
          </Button>
        </Fragment>
      )}

      <QueryModals setShowModal={setShowModal} modalProps={showModal} />
    </Wrapper>
  );
};

export default QueryActions;
