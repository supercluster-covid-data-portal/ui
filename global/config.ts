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

import getNextConfig from 'next/config';

type AppConfig = {
  NEXT_PUBLIC_ADMIN_EMAIL: string;
  NEXT_PUBLIC_AUTH_API_ROOT: string;
  NEXT_PUBLIC_AUTH_CLIENT_ID: string;
  NEXT_PUBLIC_AUTH_REDIRECT_URI: string;
  NEXT_PUBLIC_AUTH_SCOPES: string;
  NEXT_PUBLIC_ARRANGER_API_URL: string;
  NEXT_PUBLIC_ARRANGER_GRAPHQL_FIELD: string;
  NEXT_PUBLIC_ARRANGER_INDEX: string;
  NEXT_PUBLIC_ARRANGER_MANIFEST_COLUMNS: string;
  NEXT_PUBLIC_BASE_PATH: string;
  NEXT_PUBLIC_DOMAIN_ROOT_URL: string;
  NEXT_PUBLIC_GOOGLE_ANALYTICS_DEBUG: boolean;
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: string;
  NEXT_PUBLIC_LAB_NAME: string;
  NEXT_PUBLIC_LOGO_FILENAME: string;
  NEXT_PUBLIC_SESSION_TOKEN_KEY: string;
  NEXT_PUBLIC_SSO_PROVIDERS: string;
};

export const getConfig = (): AppConfig => {
  const publicConfig: { [k: string]: string } = getNextConfig()?.publicRuntimeConfig || {};

  return {
    NEXT_PUBLIC_ADMIN_EMAIL: publicConfig.NEXT_PUBLIC_ADMIN_EMAIL,
    NEXT_PUBLIC_AUTH_API_ROOT: publicConfig.NEXT_PUBLIC_AUTH_API_ROOT || '/',
    NEXT_PUBLIC_AUTH_CLIENT_ID: publicConfig.NEXT_PUBLIC_AUTH_CLIENT_ID || '',
    NEXT_PUBLIC_AUTH_REDIRECT_URI:
      publicConfig.NEXT_PUBLIC_AUTH_REDIRECT_URI || 'http://localhost:3000',
    NEXT_PUBLIC_AUTH_SCOPES: publicConfig.NEXT_PUBLIC_AUTH_SCOPES || 'openid',
    NEXT_PUBLIC_ARRANGER_API_URL:
      publicConfig.NEXT_PUBLIC_ARRANGER_API_URL || 'http://localhost:8080/api',
    NEXT_PUBLIC_ARRANGER_GRAPHQL_FIELD: publicConfig.NEXT_PUBLIC_ARRANGER_GRAPHQL_FIELD || '',
    NEXT_PUBLIC_ARRANGER_INDEX: publicConfig.NEXT_PUBLIC_ARRANGER_INDEX || '',
    NEXT_PUBLIC_ARRANGER_MANIFEST_COLUMNS: publicConfig.NEXT_PUBLIC_ARRANGER_MANIFEST_COLUMNS || '',
    NEXT_PUBLIC_BASE_PATH: publicConfig.NEXT_PUBLIC_BASE_PATH || '/',
    NEXT_PUBLIC_DOMAIN_ROOT_URL:
      publicConfig.NEXT_PUBLIC_DOMAIN_ROOT_URL || 'http://localhost:3000',
    NEXT_PUBLIC_GOOGLE_ANALYTICS_DEBUG:
      (publicConfig.NEXT_PUBLIC_GOOGLE_ANALYTICS_DEBUG || '').toLowerCase() === 'true',
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: publicConfig.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '',
    NEXT_PUBLIC_LAB_NAME: publicConfig.NEXT_PUBLIC_LAB_NAME || 'Data Management System',
    NEXT_PUBLIC_LOGO_FILENAME: publicConfig.NEXT_PUBLIC_LOGO_FILENAME,
    NEXT_PUBLIC_SESSION_TOKEN_KEY:
      publicConfig.NEXT_PUBLIC_SESSION_TOKEN_KEY || 'wallet-session-token',
    NEXT_PUBLIC_SSO_PROVIDERS: publicConfig.NEXT_PUBLIC_SSO_PROVIDERS || '',
  };
};
