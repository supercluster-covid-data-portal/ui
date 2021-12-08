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
import urlJoin from 'url-join';

import { IconProps } from './theme/icons/types';
import { getConfig } from '../global/config';
import { AUTHORIZE_ENDPOINT } from '../global/utils/constants';
import Button from './Button';

const LoginButton = ({ Icon, title }: { Icon?: React.ComponentType<IconProps>; title: string }) => {
  const {
    NEXT_PUBLIC_AUTH_API_ROOT,
    NEXT_PUBLIC_AUTH_CLIENT_ID,
    NEXT_PUBLIC_AUTH_REDIRECT_URI,
    NEXT_PUBLIC_AUTH_SCOPES,
  } = getConfig();

  const url = new URL(`${urlJoin(NEXT_PUBLIC_AUTH_API_ROOT, AUTHORIZE_ENDPOINT)}`);
  url.searchParams.append('client_id', NEXT_PUBLIC_AUTH_CLIENT_ID);
  url.searchParams.append('redirect_uri', NEXT_PUBLIC_AUTH_REDIRECT_URI);
  url.searchParams.append('response_type', 'code');
  url.searchParams.append('resource', window.origin);
  url.searchParams.append('scope', encodeURI(NEXT_PUBLIC_AUTH_SCOPES));

  return (
    <a
      // to respect '+' signs, as they break when using the `searchParams` API
      href={url.href.replaceAll('%2B', '+')}
      css={css`
        text-decoration: none;
      `}
    >
      <Button>
        {Icon && (
          <span
            css={css`
              display: flex;
              flex: 1;
              justify-content: center;
              align-items: center;
            `}
          >
            <Icon width={20} height={20} />
          </span>
        )}
        {title}
      </Button>
    </a>
  );
};

export default LoginButton;
