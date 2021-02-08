import createEgoUtils from '@icgc-argo/ego-token-utils';
import { memoize } from 'lodash';

import { getConfig } from '../config';
import { EgoJwtData, User } from '../types';

const TokenUtils = createEgoUtils(getConfig().NEXT_PUBLIC_EGO_PUBLIC_KEY);

export const isValidJwt = (egoJwt: string | undefined) => !!egoJwt && TokenUtils.isValidJwt(egoJwt);

export const decodeToken = memoize((egoJwt?: string) =>
  egoJwt ? TokenUtils.decodeToken(egoJwt) : null,
);

export const extractUser: (decodedToken: EgoJwtData) => User | {} = (decodedToken) => {
  return decodedToken ? decodedToken?.context.user : {};
};
