import { getConfig } from '../config';

const { NEXT_PUBLIC_EGO_API_ROOT } = getConfig();

export const EGO_JWT_KEY = 'EGO_JWT';
export const EGO_API_KEY_ENDPOINT = `${NEXT_PUBLIC_EGO_API_ROOT}/o/api_key`;

export const EXPLORER_PATH = '/explorer';
export const USER_PATH = '/user';
export const LOGIN_PATH = '/login';

// dimension constants
export const FACET_MAX_WIDTH = 270;
export const FACET_MIN_WIDTH = 250;
export const FOOTER_HEIGHT = 47;
export const NAVBAR_HEIGHT = 50;
