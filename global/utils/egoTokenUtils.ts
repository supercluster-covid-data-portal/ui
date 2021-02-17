import createEgoUtils from '@icgc-argo/ego-token-utils';
import { memoize } from 'lodash';

import { getConfig } from '../config';
import { EgoJwtData, UserWithId } from '../types';

const TokenUtils = createEgoUtils(getConfig().NEXT_PUBLIC_EGO_PUBLIC_KEY);

export const isValidJwt = (egoJwt: string | undefined) => !!egoJwt && TokenUtils.isValidJwt(egoJwt);

export const decodeToken = memoize((egoJwt?: string) =>
  egoJwt && isValidJwt(egoJwt) ? TokenUtils.decodeToken(egoJwt) : null,
);

// EgoJwtData will need to be updated in ego-token-utils to include new User type in Ego 4.x.x
// that includes providerSubjectId and providerType, and removes name
// matching older version for now
export const extractUser = (decodedToken: EgoJwtData) => {
  if (decodedToken) {
    return { ...decodedToken?.context.user, id: decodedToken?.sub };
  }
  return undefined;
};
