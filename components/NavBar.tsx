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
import { useTheme } from 'emotion-theming';
import { useRouter } from 'next/router';
import urlJoin from 'url-join';

import UserDropdown from './UserDropdown';
import { DefaultTheme } from './theme';
import useAuthContext from '../global/hooks/useAuthContext';
import { InternalLink as Link } from './Link';
import { EXPLORER_PATH, USER_PATH } from '../global/utils/constants';
import { getConfig } from '../global/config';
import LoginButton from './LoginButton';

const NavBar: React.ComponentType = () => {
  const { token } = useAuthContext();
  const router = useRouter();
  const theme: DefaultTheme = useTheme();

  const { NEXT_PUBLIC_LAB_NAME, NEXT_PUBLIC_BASE_PATH } = getConfig();

  const activeLinkStyle = `
    background-color: ${theme.colors.grey_200};
    color: ${theme.colors.accent_dark};
  `;

  const labIcon = (
    <img
      src={urlJoin(NEXT_PUBLIC_BASE_PATH, 'images/logo-covid-cloud.png')}
      alt={NEXT_PUBLIC_LAB_NAME}
      width={theme.dimensions.labIcon.width}
      height={theme.dimensions.labIcon.height}
    />
  );

  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        height: ${theme.dimensions.navbar.height}px;
        background-color: ${theme.colors.white};
        ${theme.shadow.default};
        position: sticky;
        top: 0;
        left: 0;
        z-index: 5;
        width: 100%;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          margin-left: 16px;
          cursor: pointer;
        `}
      >
        <Link path={EXPLORER_PATH}>
          <a
            css={css`
              display: flex;
              align-items: center;
              text-decoration: none;
              height: 100%;
              ${theme.typography.heading};
              color: ${theme.colors.accent_dark};
            `}
          >
            {labIcon}
          </a>
        </Link>
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            width: 144px;
            background-color: ${theme.colors.white};
            height: 100%;
            &:hover {
              background-color: ${theme.colors.grey_200};
            }
            border-right: 2px solid ${theme.colors.white};
          `}
        >
          <Link path={EXPLORER_PATH}>
            <a
              css={css`
                display: flex;
                flex: 1;
                height: 100%;
                justify-content: center;
                align-items: center;
                text-decoration: none;
                color: ${theme.colors.accent};
                cursor: pointer;
                ${router.pathname === EXPLORER_PATH ? activeLinkStyle : ''}
              `}
            >
              Data Explorer
            </a>
          </Link>
        </div>
        {token ? (
          <div
            css={css`
              width: 195px;
              height: 100%;
              display: flex;
              ${router.pathname === USER_PATH ? activeLinkStyle : ''}
              &:hover {
                background-color: ${theme.colors.grey_200};
              }
            `}
          >
            <UserDropdown />
          </div>
        ) : (
          <div
            css={css`
              width: 145px;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            <LoginButton title="Log in" />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
