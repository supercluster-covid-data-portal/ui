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

const Share = ({ fill = '#28519D', size = '12px', style }: IconProps): ReactElement => {
  return (
    <svg
      css={css`
        ${style}
        height: ${size};
        width: ${size};
      `}
      viewBox="0 0 18 20"
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-1.000000, 0.000000)" fill={fill}>
          <path d="M15.1111111,13.2888889 C14.312793,13.2936229 13.5446556,13.5945427 12.9555556,14.1333333 L7.55555556,10.8 C7.63226729,10.5397247 7.67704042,10.2710859 7.68888889,10 C7.68249405,9.72109601 7.63762606,9.44441004 7.55555556,9.17777778 L12.9555556,5.86666667 C13.5588953,6.37637552 14.3213211,6.65933767 15.1111111,6.66666667 C16.9520603,6.66666667 18.4444444,5.1742825 18.4444444,3.33333333 C18.4444444,1.49238417 16.9520603,7.21815298e-15 15.1111111,7.10542736e-15 C13.2701619,6.99270173e-15 11.7777778,1.49238417 11.7777778,3.33333333 C11.7639969,3.59927216 11.8095411,3.86494672 11.9111111,4.11111111 L6.51111111,7.46666667 C5.90146521,6.95009347 5.13226005,6.65967928 4.33333333,6.64444444 C2.48726666,6.6530158 0.996305079,8.15391712 0.999993147,10 C1.00410293,10.8787222 1.35803418,11.7196219 1.98354746,12.336795 C2.60906075,12.9539681 3.45463523,13.2965807 4.33333333,13.2888889 C5.1273892,13.28944 5.897055,13.0145593 6.51111111,12.5111111 L11.9111111,15.8222222 C11.8094709,16.0761465 11.7639854,16.3490591 11.7777778,16.6222222 C11.7732845,17.9769354 12.5864807,19.2005479 13.8372179,19.721052 C15.0879552,20.241556 16.529151,19.9561265 17.4870832,18.9981943 C18.4450153,18.0402621 18.7304449,16.5990663 18.2099408,15.348329 C17.6894368,14.0975918 16.4658243,13.2843956 15.1111111,13.2888889 Z"></path>
        </g>
      </g>
    </svg>
  );
};

export default Share;
