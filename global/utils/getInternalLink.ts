import urlJoin from 'url-join';

import { getConfig } from '../config';

export default ({ path }: { path: string }) => {
  const { NEXT_PUBLIC_BASE_PATH } = getConfig();
  return urlJoin(NEXT_PUBLIC_BASE_PATH, path);
};
