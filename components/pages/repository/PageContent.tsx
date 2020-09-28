import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import styled from '@emotion/styled';

import RepoTable from './RepoTable';
import Facets from './Facets';
import QueryBar from './QueryBar';

import { PageContentProps } from './index';
import defaultTheme from '../../theme';
import Footer from '../../Footer';

export const Collapsible = styled('div')`
  border-top: 1px solid ${({ theme }: { theme: typeof defaultTheme }) => theme.colors.grey_2};
  height: 47px;
  width: 100%;
`;

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
            min-width: 250px;
            max-width: 270px;
            background-color: ${theme.colors.white};
            ${theme.shadow.default}
            z-index: 1;
          `}
        >
          <Facets {...props} />
          <Collapsible />
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            width: 100%;
          `}
        >
          <div
            css={css`
              flex: 8.5;
              margin: 0 15px 0 15px;
            `}
          >
            <QueryBar {...props} />
            <RepoTable {...props} />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default PageContent;
