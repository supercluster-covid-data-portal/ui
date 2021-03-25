import { get } from 'lodash';
import React from 'react';
import ClientError from '../components/ClientError';

import Error403 from '../components/pages/403';
import Error404 from '../components/pages/404';
import Error500 from '../components/pages/500';
import { createPage } from '../global/utils/pages';

export const ERROR_STATUS_KEY = 'statusCode';

const Error = createPage({
  getInitialProps: async ({ query, res, err }) => {
    if (get(err, ERROR_STATUS_KEY) === 403 || get(query, 'error_code') === '403') {
      if (res) {
        res[ERROR_STATUS_KEY] = 403;
      }
    }
    return {
      query,
      [ERROR_STATUS_KEY]: get(res, ERROR_STATUS_KEY) || get(err, ERROR_STATUS_KEY) || null,
    };
  },
  isPublic: true,
})(({ query, ...props }) => {
  const errorCode = props[ERROR_STATUS_KEY];

  switch (errorCode) {
    case 404:
      return <Error404 />;
    case 403:
      return <Error403 query={query} />;
    case 500:
      return <Error500 />;
    default:
      return <ClientError />;
  }
});

export default Error;
