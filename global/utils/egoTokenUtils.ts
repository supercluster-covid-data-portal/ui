import createEgoUtils from '@icgc-argo/ego-token-utils';
import { memoize } from 'lodash';

import { getConfig } from '../config';
import { EgoJwtData, UserWithId } from '../types';

const TokenUtils = createEgoUtils(getConfig().NEXT_PUBLIC_EGO_PUBLIC_KEY);

export const isValidJwt = (egoJwt: string | undefined) => !!egoJwt && TokenUtils.isValidJwt(egoJwt);

export const decodeToken = memoize((egoJwt?: string) =>
  egoJwt ? TokenUtils.decodeToken(egoJwt) : null,
);

export const extractUser: (decodedToken: EgoJwtData) => UserWithId | {} = (decodedToken) => {
  if (decodedToken) {
    return { ...decodedToken?.context.user, id: decodedToken?.sub };
  }
  return {};
};
