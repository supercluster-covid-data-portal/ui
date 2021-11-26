import { useState } from 'react';
import axios, { AxiosError, AxiosResponse, Method } from 'axios';
import urlJoin from 'url-join';

import { getConfig } from '@/config';
import { StoredQueryObject } from '../types';

const needsData = (method: Method) => ['PATCH', 'POST', 'PUT'].includes(method.toUpperCase());

const useQueryStorage = ({ token = '', userId = '' }: { token?: string; userId?: string }) => {
  const [currentEtag, setCurrentEtag] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [storedQueries, setStoredQueries] = useState<Record<string, StoredQueryObject>>({});

  const { NEXT_PUBLIC_ARRANGER_API_URL } = getConfig();
  const queriesStorageURL = urlJoin(NEXT_PUBLIC_ARRANGER_API_URL, 'storage', 'query');

  const callQueryStorage = ({
    data,
    method = 'GET',
    queryId = '',
  }: {
    data?: Record<string, any>;
    method?: Method;
    queryId?: string;
  } = {}) => {
    if (userId && token) {
      setIsLoading(true);

      const headers = {
        Authorization: `Bearer ${token}`,
        'If-Match': currentEtag,
        UserID: userId,
      };

      return axios({
        ...(needsData(method) && { data }),
        headers,
        method,
        url: queryId ? urlJoin(queriesStorageURL, queryId) : queriesStorageURL,
      })
        .then((response: AxiosResponse) => {
          if ([200, 204].includes(response.status)) {
            setCurrentEtag(response.data.etag);
            setStoredQueries(response.data.queries);

            return response.data;
          }
        })
        .catch((error: AxiosError) => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(true);
        });
    }

    return Promise.reject('No userId or token');
  };

  const checkExistingQueries = (newQueryLabel: string, currentUrl?: string): string | null => {
    const found = Object.entries(storedQueries).find(([queryId, queryData]) => {
      return queryData.label === newQueryLabel || queryData.url === currentUrl;
    });

    return found?.[0] || null;
  };

  return { callQueryStorage, checkExistingQueries, isLoading, storedQueries };
};

export default useQueryStorage;
