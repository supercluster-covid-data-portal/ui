import React from 'react';
import ErrorNotification from '../ErrorNotification';
import PageLayout from '../PageLayout';

const Error500 = () => {
  return (
    <PageLayout subtitle={`Error - 500`}>
      <ErrorNotification size="lg" title="Something went wrong">
        Sorry, something went wrong!
      </ErrorNotification>
    </PageLayout>
  );
};

export default Error500;
