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

import { ReactElement } from 'react';
import { css } from '@emotion/core';

import { IconProps } from './types';

const ClipboardIcon = ({ fill = '#28519D', size = '18px', style }: IconProps): ReactElement => {
  return (
    <svg
      css={css`
        ${style};
        height: ${size};
        width: ${size};
      `}
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
    >
      <g>
        <path
          fill={fill}
          d="M80,25H70V12.5C70,8.4,66.6,5,62.5,5H20c-4.1,0-7.5,3.4-7.5,7.5V65c0,4.1,3.4,7.5,7.5,7.5h10V85   c0,4.1,3.4,7.5,7.5,7.5H80c4.1,0,7.5-3.4,7.5-7.5V32.5C87.5,28.4,84.1,25,80,25z M30,32.5V65H20V12.5h42.5V25h-25   C33.4,25,30,28.4,30,32.5z M80,85H37.5V32.5H80V85z"
        ></path>
      </g>
    </svg>
  );
};

export default ClipboardIcon;
