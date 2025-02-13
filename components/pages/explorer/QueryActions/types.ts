/*
 * Copyright (c) 2021 The Ontario Institute for Cancer Research. All rights reserved
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

import { ReactNode } from 'react';

export interface EtagObject {
  etag: string;
}

export type StoredQueryObject = {
  label: string;
  url: string;
};

export type AllStoredQueriesObject = Record<'queries', Record<string, StoredQueryObject>>;

export type StoredQueriesResponse = AllStoredQueriesObject & EtagObject;

export type QueryModalTypeName =
  | 'editQuery'
  | 'editQuery_success'
  | 'editQuery_error'
  | 'saveQuery'
  | 'saveQuery_success'
  | 'saveQuery_error'
  | 'deleteQuery'
  | 'deleteQuery_success'
  | 'deleteQuery_error';

export type QueryModalPayload = {
  actionType: QueryModalTypeName;
  callback?: (data?: string) => void;
  currentValue?: string;
  inputValidation?: (label: string) => any;
};

export type QueryModalsData = Record<
  QueryModalTypeName,
  {
    actionText?: string;
    content?: ReactNode;
    title?: string;
    type: 'confirmation' | 'error' | 'input' | 'success';
  }
>;
