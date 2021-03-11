import { css } from '@emotion/core';
import RepoTable from './RepoTable';
import Facets from './Facets';
import QueryBar from './QueryBar';

import { PageContentProps } from './index';
import {
  FACET_MAX_WIDTH,
  FACET_MIN_WIDTH,
  FOOTER_HEIGHT,
  NAVBAR_HEIGHT,
} from '../../../global/utils/constants';

const PageContent = (props: PageContentProps) => {
  return (
    <div
      css={css`
        flex: 1;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: row;
          margin-left: 0;
        `}
      >
        <div
          css={(theme) => css`
            flex: 3;
            flex-direction: column;
            min-width: ${FACET_MIN_WIDTH}px;
            max-width: ${FACET_MAX_WIDTH}px;
            background-color: ${theme.colors.white};
            z-index: 1;
            ${theme.shadow.right};
            height: calc(100vh - ${FOOTER_HEIGHT + NAVBAR_HEIGHT}px);
            overflow-y: scroll;
          `}
        >
          <Facets {...props} />
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            width: 100%;
            height: calc(100vh - ${FOOTER_HEIGHT + NAVBAR_HEIGHT}px);
            overflow-y: scroll;
          `}
        >
          <div
            css={css`
              flex: 8.5;
              margin: 0 15px 0 15px;
              max-width: calc(100vw - ${FACET_MAX_WIDTH + 10}px);
            `}
          >
            <QueryBar {...props} />
            <RepoTable {...props} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageContent;
