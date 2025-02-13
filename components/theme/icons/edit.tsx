/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { css } from '@emotion/core';

import { IconProps } from './types';

const EditIcon = ({ fill, size = '12px', style }: IconProps) => {
  return (
    <svg
      css={css`
        ${style}
        height: ${size};
        width: ${size};
      `}
      viewBox="0 0 20 20"
    >
      <path
        fill={fill}
        fillRule="evenodd"
        d="M17.975.718a2.456 2.456 0 0 0-3.471 0L1.874 13.294a.431.431 0 0 0-.098.123s0 .025-.024.025c-.025.049-.05.074-.05.123v.024L.03 19.042c-.074.27 0 .54.172.737A.71.71 0 0 0 .718 20c.074 0 .148 0 .221-.025l5.441-1.67h.025c.049-.024.098-.024.123-.049 0 0 .024 0 .024-.024.05-.025.099-.05.123-.099L19.28 5.557c.96-.958.96-2.505 0-3.463L17.975.718z"
      />
    </svg>
  );
};

export default EditIcon;
