import createEgoUtils from '@icgc-argo/ego-token-utils';
import { getConfig } from '../config';

const TokenUtils = createEgoUtils(getConfig().NEXT_PUBLIC_EGO_PUBLIC_KEY);

export const isValidJwt = (egoJwt: string | undefined) => !!egoJwt && TokenUtils.isValidJwt(egoJwt);
