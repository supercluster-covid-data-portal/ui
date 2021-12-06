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

import { useCallback } from 'react';
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

import Button from '@/components/Button';
import Dropdown from '@/components/Dropdown';
import { DefaultTheme } from '@/components/theme';
import { ClipboardIcon, ShareIcon } from '@/components/theme/icons';

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
  const copyLink = useCallback(() => navigator.clipboard.writeText(queryUrl), [queryUrl]);

  const shareChannels = [
    <Button
      css={css`
        background: transparent;
        border: none;
        color: ${theme.colors.grey_800};
        justify-content: flex-start;
        padding: 0;
        width: 100%;

        &:hover {
          background: transparent;
        }

        > span {
          align-items: center;
          display: flex;
          flex-wrap: nowrap;
        }
      `}
      onClick={copyLink}
    >
      <div
        css={css`
          align-items: center;
          background: ${theme.colors.grey_700};
          display: flex;
          height: 13px;
          justify-content: center;
          margin-right: 5px;
          width: 13px;
        `}
      >
        <ClipboardIcon fill={theme.colors.white} size="10px" />
      </div>
      Copy link
    </Button>,

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
