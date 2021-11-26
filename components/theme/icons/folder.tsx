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

const Folder = ({ fill = '#28519D', size = '12px', style }: IconProps): ReactElement => {
  return (
    <svg
      css={css`
        ${style}
        height: ${size};
        width: ${size};
      `}
      fill={fill}
      viewBox="20 10 120 90"
    >
      <path d="M127.913,52.8c-0.562-0.801-1.479-1.277-2.456-1.277H51.835c-1.264,0-2.392,0.791-2.821,1.979L33.696,95.828  c-0.332,0.918-0.195,1.942,0.365,2.742c0.562,0.801,1.479,1.277,2.456,1.277h73.621c1.263,0,2.391-0.791,2.821-1.979l15.317-42.326  C128.61,54.624,128.474,53.6,127.913,52.8z"></path>
      <path d="M23.802,96.72l18.183-50.24c0.859-2.376,3.115-3.958,5.643-3.958h68.219v-5.5c0-3.313-2.687-6-6-6H67.202l-9.916-9.917  c-1.126-1.126-2.651-1.758-4.243-1.758h-26.58c-3.313,0-6,2.687-6,6v66C20.462,93.705,21.825,95.738,23.802,96.72z"></path>
    </svg>
  );
};

export default Folder;
