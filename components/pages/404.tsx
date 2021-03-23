import React from 'react';
import ErrorNotification from '../ErrorNotification';
import PageLayout from '../PageLayout';

const Error404 = () => {
  return (
    <PageLayout subtitle={`Error - 404`}>
      <ErrorNotification
        size="lg"
        title="Page not found"
        styles={`
              flex-direction: column;
              justify-content: center;
              align-items: center;
            `}
      >
        Sorry, that page cannot be found!
      </ErrorNotification>
    </PageLayout>
  );
};

export default Error404;
