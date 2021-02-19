import jwtDecode from 'jwt-decode';
import { memoize } from 'lodash';
import jwt from 'jsonwebtoken';

import { getConfig } from '../config';
import { EgoJwtData, UserWithId } from '../types';

const { NEXT_PUBLIC_EGO_PUBLIC_KEY } = getConfig();

const verifyJwt: (egoPublicKey: string) => (egoJwt?: string) => boolean = (egoPublicKey) => (
  egoJwt,
) => {
  try {
    if (!egoJwt || !egoPublicKey) {
      return false;
    } else {
      return jwt.verify(egoJwt, egoPublicKey, { algorithms: ['RS256'] }) && true;
    }
  } catch (err) {
    return false;
  }
};

export const isValidJwt = verifyJwt(NEXT_PUBLIC_EGO_PUBLIC_KEY);

export const decodeToken: (egoJwt?: string) => EgoJwtData | null = memoize((egoJwt) =>
  egoJwt && isValidJwt(egoJwt) ? jwtDecode(egoJwt) : null,
);

export const extractUser: (decodedToken: EgoJwtData) => UserWithId | undefined = (decodedToken) => {
  if (decodedToken) {
    return { ...decodedToken?.context.user, id: decodedToken?.sub };
  }
  return undefined;
};
