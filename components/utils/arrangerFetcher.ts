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

import urlJoin from 'url-join';
import { getConfig } from '../../global/config';
import ajax from './ajax';

const createArrangerFetcher =
  ({ onError = (err: any) => Promise.reject(err), defaultHeaders = {} } = {}) =>
  ({ method = 'post', body = {}, headers = {} }) => {
    const { NEXT_PUBLIC_ARRANGER_API } = getConfig();
    const uri = urlJoin(NEXT_PUBLIC_ARRANGER_API, '/graphql');
    return ajax
      .post(uri, body, {
        headers: {
          'Content-Type': 'application/json',
          ...(defaultHeaders || {}),
          ...headers,
        },
      })
      .then((response: { data: any }) => {
        return response.data;
      })
      .catch((err: { response: any }) => {
        return onError(err);
      });
  };

export default createArrangerFetcher;
