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

import React from 'react';
import urlJoin from 'url-join';
import NextHead from 'next/head';
import { getConfig } from '../global/config';

const Head = () => {
  const { NEXT_PUBLIC_BASE_PATH } = getConfig();
  return (
    <NextHead>
      <link
        href={'https://fonts.googleapis.com/css?family=Lato:300,400,600&display=swap'}
        rel="stylesheet"
      />

      <link rel="shortcut icon" href={urlJoin(NEXT_PUBLIC_BASE_PATH, '/images/favicon.ico')} />
    </NextHead>
  );
};

export const PageHead = ({ subtitle }: { subtitle?: string }) => {
  return (
    <NextHead>
      {/* <title>COVID Cloud{subtitle ? ` - ${subtitle}` : ''}</title> */}
      <title>COVID Sequence Data Explorer</title>
    </NextHead>
  );
};

export default Head;
