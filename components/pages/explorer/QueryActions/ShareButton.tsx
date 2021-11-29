import { useTheme } from 'emotion-theming';
import { css } from '@emotion/core';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';

import Dropdown from '@/components/Dropdown';
import { DefaultTheme } from '@/components/theme';
import { ShareIcon } from '@/components/theme/icons';
import { Fragment } from 'react';

const ShareButton = ({
  queryLabel,
  queryUrl,
  title,
}: {
  queryLabel: string;
  queryUrl: string;
  title?: string;
}) => {
  const theme: DefaultTheme = useTheme();

  const shareChannels = [
    <FacebookShareButton quote={`COVID sequence data: ${queryLabel}`} url={queryUrl}>
      <FacebookIcon size="13" /> Share on Facebook
    </FacebookShareButton>,

    <TwitterShareButton title={`COVID sequence data: ${queryLabel}`} url={queryUrl}>
      <TwitterIcon size="13" /> Share on Twitter
    </TwitterShareButton>,

    <LinkedinShareButton title={`COVID sequence data: ${queryLabel}`} url={queryUrl}>
      <LinkedinIcon size="13" /> Share on Linkedin
    </LinkedinShareButton>,
  ];

  return (
    <Dropdown
      css={css`
        .react-share__ShareButton {
          align-items: center;
          display: flex;
          white-space: nowrap;
          width: 100%;

          svg {
            margin-right: 5px;
          }
        }
      `}
      data={shareChannels}
      title={title}
    >
      <ShareIcon
        fill={theme.colors.white}
        size="10px"
        style={css`
          margin-left: -1px;
          margin-right: 5px;
        `}
      />
      Share
    </Dropdown>
  );
};

export default ShareButton;
