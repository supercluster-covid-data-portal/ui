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

import { css } from '@emotion/core';
import dynamic from 'next/dynamic';
import urlJoin from 'url-join';
import { useTheme } from 'emotion-theming';

import { PageContentProps } from './index';
import StyledLink from '../../Link';
import defaultTheme from '../../theme';
import { getConfig } from '../../../global/config';
import { CLOUD_CLI_DOCS_URL, DOWNLOAD_SEQ_PATH } from '../../../global/utils/constants';
import ajax from '../../utils/ajax';
import createDownloadInWindow from '../../utils/createDownloadInWindow';
import React, { useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import SimpleNotification from '../../SimpleNotification';

const Table = dynamic(
  () => import('@overture-stack/arranger-components/dist/Arranger').then((comp) => comp.Table),
  { ssr: false },
) as any;

const getTableStyle = (theme: typeof defaultTheme) => css`
  border-radius: 5px;
  background-color: ${theme.colors.white};
  padding: 8px;
  margin-bottom: 12px;
  ${theme.shadow.default};
  & .tableToolbar {
    background-color: ${theme.colors.white};
    padding: 10px 8px;
    ${theme.typography.label};
    font-weight: normal;
    height: 32px;
    & .group {
      height: 32px;
      & .buttonWrapper button,
      & .dropDownHeader button {
        align-items: center;
        border-radius: 4px;
        border: solid 1px ${theme.colors.grey_400};
        background-color: ${theme.colors.white};
        color: ${theme.colors.grey_800};
        ${theme.typography.button};
        padding: 6px 15px;
        &:hover {
          background-color: ${theme.colors.grey_100};
        }
        &:focus {
          outline: none;
        }
      }
      & .buttonWrapper button:before {
        content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 20 20'%3E%3Cpath fill='%23003055' fill-rule='evenodd' d='M1.32 17.162h17.162c.729 0 1.32.59 1.32 1.32 0 .73-.591 1.32-1.32 1.32H1.32c-.729 0-1.32-.59-1.32-1.32 0-.73.591-1.32 1.32-1.32zm4.93-8.87l2.232 2.227V1.512c0-.774.63-1.402 1.406-1.402.777 0 1.406.628 1.406 1.402v9.032l2.257-2.252c.55-.548 1.44-.548 1.989 0 .549.547.55 1.435 0 1.983l-4.976 4.963c-.366.365-.96.365-1.327 0l-4.975-4.963c-.549-.548-.549-1.435 0-1.983.55-.548 1.439-.548 1.988 0z'/%3E%3C/svg%3E%0A");
        margin-top: 2px;
        margin-right: 4px;
      }
      & .dropDownHeader button {
        margin-right: 8px;
      }
      & .dropDownHeader button:after {
        content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23151c3d' fill-rule='evenodd' d='M9.952 3.342c.468-.456 1.228-.456 1.697 0 .234.228.351.526.351.825 0 .298-.117.597-.351.825l-4.8 4.666c-.469.456-1.23.456-1.697 0l-4.8-4.666c-.47-.456-.47-1.194 0-1.65.468-.456 1.228-.456 1.696 0L6 7.184l3.952-3.842z'/%3E%3C/svg%3E");
        margin-top: 2px;
        margin-left: -3px;
      }
      & .dropDownButton svg {
        display: none;
      }
      & div.dropDownContent {
        right: 7px !important;
        border-radius: 4px;
        ${theme.shadow.default};
      }
      & .dropDownContent {
        max-width: 200px;
        max-height: 285px;
        overflow-y: scroll;
        top: 90%;

        ${theme.typography.label};
        font-weight: normal;

        .dropDownContentElement.clickable:not([disabled]):hover {
          background: ${theme.colors.grey_300};
        }

        /* left-orient checkboxes */
        &.multiple {
          .dropDownContentElement {
            margin-left: 15px;
            padding-left: 8px;
            position: relative;
          }
          & .dropDownContentElement input[type='checkbox' i] {
            position: absolute;
            left: -17px;
            bottom: 4px;
          }
        }
      }
    }
  }
  & .ReactTable {
    background-color: ${theme.colors.white};
    border: none;
    &.rt-tr-group .rt-tr {
      &.selected {
        background-color: pink;
      }
    }
    .rt-tbody {
      border-right: none;
      .rt-td {
        ${theme.typography.data}
        border: 1px solid ${theme.colors.grey_300};
        height: 40px;
        line-height: 1.6rem;
        & div {
          text-align: left !important;
          vertical-align: middle;
        }
      }
    }
    & .rt-thead {
      & .rt-tr .rt-th {
        align-items: center;
        border: 1px solid ${theme.colors.grey_400};
        border-bottom: none;
        display: flex;
        height: 40px;
        padding: 6px 5px 2px;

        &.-sort-asc {
          box-shadow: inset 0 3px 0 0 ${theme.colors.grey_500};
        }
        &.-sort-desc {
          box-shadow: inset 0 -3px 0 0 ${theme.colors.grey_500};
        }

        &:focus {
          outline: none;
        }
      }
    }
    & .rt-thead .rt-th {
      ${theme.typography.data};
      font-size: 14px;
      font-weight: 600;
      text-align: left;
      color: ${theme.colors.grey_800};
    }
    & .rt-td .td-actions {
      width: 100%;
      display: inline-block;
      text-align: center;
    }
    & .rt-tr-group {
      border: none !important;

      &:hover {
        background: ${theme.colors.grey_200};
      }
    }
    & .rt-tr-group .rt-tr.-even {
      &:hover {
        background: ${theme.colors.grey_200};
      }
    }
    & .rt-tr-group .rt-tr.-odd {
      background-color: ${theme.colors.white};
      &:hover {
        background: ${theme.colors.grey_200};
      }
    }
    & .pagination-bottom {
      & .-pagination {
        padding: 0px;
        height: 45px;
        box-shadow: none;
        border: none;
        ${theme.typography.label};
        font-weight: normal;
        & .-pageJump {
          border: none;
          display: flex;
          font-size: 13px;
          justify-content: space-around;
          & .-pagination_button {
            cursor: pointer;
            background-position: center;
            background-color: ${theme.colors.white};
            margin: 0 6px;
            height: 24px;
            width: 24px;
            border-radius: 25px;
            text-align: center;
            padding-top: 3px;
          }
          & .-pagination_button.-current {
            background-color: ${theme.colors.accent};
            color: ${theme.colors.white};
          }
          & .-toStart,
          & .-previous,
          & .-next,
          & .-toEnd {
            font-weight: normal;
          }
          & .-toStart,
          & .-toEnd {
            letter-spacing: -2px;
          }
        }
      }
      & select {
        padding: 5px 10px 5px 5px;
        appearance: none;
        width: 45px;
        text-align: left;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 12 12'%3E%3Cpath fill='%23151c3d' fill-rule='evenodd' d='M9.952 3.342c.468-.456 1.228-.456 1.697 0 .234.228.351.526.351.825 0 .298-.117.597-.351.825l-4.8 4.666c-.469.456-1.23.456-1.697 0l-4.8-4.666c-.47-.456-.47-1.194 0-1.65.468-.456 1.228-.456 1.696 0L6 7.184l3.952-3.842z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: bottom 7px right 4px;
      }
    }
  }
`;

const DownloadSequences = ({
  ids,
  loadingState,
  setLoadingState,
  setErrorState,
}: {
  ids: string[];
  loadingState: boolean;
  setLoadingState: (isLoading: boolean) => void;
  setErrorState: (errorState: string | null) => void;
}) => {
  const { NEXT_PUBLIC_ARRANGER_API_URL, NEXT_PUBLIC_FILE_DOWNLOAD_LIMIT } = getConfig();
  const downloadFilesEnabled =
    !loadingState && ids.length && ids.length <= NEXT_PUBLIC_FILE_DOWNLOAD_LIMIT;

  return (
    <div
      // to match arranger menu item styles
      css={(theme) => css`
        cursor: ${downloadFilesEnabled ? 'pointer' : 'auto'};
        color: ${downloadFilesEnabled ? theme.colors.grey_800 : theme.colors.grey_disabled};
        padding: 5px;
        margin: -5px -5px 0 -5px;
        width: 100%;
        &:hover {
          background: ${downloadFilesEnabled ? theme.colors.grey_300 : theme.colors.white};
        }
      `}
      onClick={
        downloadFilesEnabled
          ? async () => {
              setLoadingState(true);
              ajax
                .post(
                  urlJoin(NEXT_PUBLIC_ARRANGER_API_URL, DOWNLOAD_SEQ_PATH),
                  {
                    ids,
                  },
                  {
                    responseType: 'blob',
                    headers: { accept: '*/*' },
                  },
                )
                .then((res: AxiosResponse) => {
                  const blob = new Blob([res.data]);
                  const filename = res.headers['content-disposition'].split('"')[1];
                  createDownloadInWindow(filename, blob);
                })
                .catch(async (err: AxiosError) => {
                  if (err) {
                    const code = err.response?.status || 500;
                    const text = await new Response(err.response?.data).text();
                    const displayError = getDownloadError(code, text);
                    return setErrorState(displayError);
                  }
                  setErrorState('An unknown error occurred. Please try again');
                })
                .finally(() => {
                  setLoadingState(false);
                });
            }
          : () => null
      }
    >
      Download Selected
    </div>
  );
};

const getDownloadError = (status: number, errText?: string) => {
  switch (status) {
    case 400:
      if (errText === 'No files found.') {
        return 'The selected sequences do not have files associated with them. Please try again with different sequences.';
      }
      return 'Failed to download files for the requested sequences. Please try again later.';
    case 500:
      return `Download failed due to an internal error [${status}]. Please try again later.`;
    default:
      return 'An unknown error occurred. Please try again.';
  }
};

const RepoTable = (props: PageContentProps) => {
  const theme: typeof defaultTheme = useTheme();

  const { NEXT_PUBLIC_ARRANGER_API_URL, NEXT_PUBLIC_FILE_DOWNLOAD_LIMIT } = getConfig();
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const { selectedTableRows } = props;
  const [seqFilesDownloading, setSeqFilesDownloading] = useState<boolean>(false);
  const [seqFilesDownloadError, setSeqFilesDownloadError] = useState<string | null>(null);

  const customExporters = [
    { label: 'Export Table to TSV', fileName: `data-explorer-table-export.${today}.tsv` }, // exports a TSV with what is displayed on the table (columns selected, etc.)
    {
      label: () => (
        <DownloadSequences
          ids={selectedTableRows}
          loadingState={seqFilesDownloading}
          setLoadingState={setSeqFilesDownloading}
          setErrorState={setSeqFilesDownloadError}
        />
      ),
    },
    {
      label: () => (
        <span
          css={css`
            border-top: 1px solid ${theme.colors.grey_500};
            margin-top: -3px;
            padding-top: 7px;
            white-space: pre-line;
            width: 140px;

            a {
              margin-left: 3px;
            }
          `}
        >
          To bulk download files for more than {NEXT_PUBLIC_FILE_DOWNLOAD_LIMIT} query results,
          please use the command line client with these
          <StyledLink
            css={css`
              line-height: inherit;
            `}
            href={CLOUD_CLI_DOCS_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            instructions
          </StyledLink>
          .
        </span>
      ),
    },
  ];

  return (
    <div css={getTableStyle(theme)}>
      <div
        css={css`
          display: flex;
          justify-content: center;
        `}
      >
        {seqFilesDownloading && (
          <SimpleNotification
            style={`
              background-color: ${theme.colors.green_accent_1};
              border: 1px solid ${theme.colors.green_accent_7};
              color: ${theme.colors.green_accent_8};
            `}
          >
            Downloading sequence files...
          </SimpleNotification>
        )}

        {seqFilesDownloadError && (
          <SimpleNotification
            title="Sequence Files Download Error"
            dismissable
            onDismiss={() => setSeqFilesDownloadError(null)}
            style={`
              background-color: ${theme.colors.error_1};
              border: 1px solid ${theme.colors.error_dark};
              color: ${theme.colors.error_dark};
              width: auto;
            `}
          >
            {seqFilesDownloadError}
          </SimpleNotification>
        )}
      </div>

      <Table
        {...props}
        showFilterInput={false}
        columnDropdownText={'Columns'}
        enableSelectedTableRowsExporterFilter
        exporter={customExporters}
        downloadUrl={urlJoin(NEXT_PUBLIC_ARRANGER_API_URL, 'download')}
        selectedRowsFilterPropertyName="sequence_id"
      />
    </div>
  );
};

export default RepoTable;
