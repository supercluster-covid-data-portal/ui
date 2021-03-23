import urlJoin from 'url-join';

import { getConfig } from '../config';

const getInternalLink = ({ path, params = '' }: { path: string; params?: string }) => {
  const { NEXT_PUBLIC_BASE_PATH } = getConfig();
  return `${urlJoin(NEXT_PUBLIC_BASE_PATH, path)}${params}`;
};

export default getInternalLink;
