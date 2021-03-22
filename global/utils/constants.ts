import { getConfig } from '../config';

const { NEXT_PUBLIC_EGO_API_ROOT } = getConfig();

export const EGO_JWT_KEY = 'EGO_JWT';
export const EGO_API_KEY_ENDPOINT = `${NEXT_PUBLIC_EGO_API_ROOT}/o/api_key`;

export const EXPLORER_PATH = '/explorer';
export const USER_PATH = '/user';
export const LOGIN_PATH = '/login';

export const GENERIC_API_ERROR_MESSAGE =
  'Please try again.  If the problem persists, please contact the DMS administrator for help troubleshooting the issue.';
