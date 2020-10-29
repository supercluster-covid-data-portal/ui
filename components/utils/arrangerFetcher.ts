import urlJoin from 'url-join';
import { getConfig } from '../../global/config';
import ajax from './ajax';

const createArrangerFetcher = ({
  onError = (err: any) => Promise.reject(err),
  defaultHeaders = {},
} = {}) => ({ method = 'post', body = {}, headers = {} }) => {
  const { NEXT_PUBLIC_ARRANGER_API, NEXT_PUBLIC_ARRANGER_PROJECT_ID } = getConfig();
  const uri = urlJoin(NEXT_PUBLIC_ARRANGER_API, NEXT_PUBLIC_ARRANGER_PROJECT_ID, '/graphql');
  return ajax
    .post(uri, body, {
      headers: {
        'Content-Type': 'application/json',
        ...(defaultHeaders || {}),
        ...headers,
      },
    })
    .then((response: { data: any }) => {
      return response.data;
    })
    .catch((err: { response: any }) => {
      return onError(err);
    });
};

export default createArrangerFetcher;
