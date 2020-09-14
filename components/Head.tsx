import React from 'react';
import NextHead from 'next/head';

export default function Head() {
  return (
    <NextHead>
      <link rel="icon" href="/static/favicon.ico" />
      <link
        href={'https://fonts.googleapis.com/css?family=Lato:300,400,600&display=swap'}
        rel="stylesheet"
      />
    </NextHead>
  );
}
