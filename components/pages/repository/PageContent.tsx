import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';

import RepoTable from './RepoTable';
import Facets from './Facets';
import QueryBar from './QueryBar';

import { PageContentProps } from './index';
import defaultTheme from '../../theme';

const PageContent = (props: PageContentProps) => {
  const theme: typeof defaultTheme = useTheme();
  return (
    <div
      css={css`
        flex: 1;
        margin: 0 15px 0 0;
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
          css={css`
            flex: 3;
            flex-direction: column;
            min-width: 250px;
            max-width: 270px;
            background-color: ${theme.colors.white};
            ${theme.shadow.default}
          `}
        >
          <Facets {...props} />
        </div>
        <div
          css={css`
            margin-left: 15px;
            flex: 8.5;
            flex-direction: column;
          `}
        >
          <QueryBar {...props} />
          <RepoTable {...props} />
        </div>
      </div>
    </div>
  );
};

export default PageContent;
