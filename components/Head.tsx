import React from 'react';
import NextHead from 'next/head';
import { getConfig } from '../global/config';

const Head = () => {
  const { NEXT_PUBLIC_BASE_PATH } = getConfig();
  return (
    <NextHead>
      <link
        href={'https://fonts.googleapis.com/css?family=Lato:300,400,600&display=swap'}
        rel="stylesheet"
      />
      <link rel="shortcut icon" href={`${NEXT_PUBLIC_BASE_PATH}/images/favicon.ico`} />
    </NextHead>
  );
};

export const PageHead = ({ subtitle }: { subtitle?: string }) => {
  return (
    <NextHead>
      <title>Overture DMS{subtitle ? ` - ${subtitle}` : ''}</title>
    </NextHead>
  );
};

export default Head;
