import React from 'react';

import ErrorNotification from '../ErrorNotification';
import PageLayout from '../PageLayout';

const Error403 = ({ query }: { query: any }) => {
  const { error_type: errorType, provider_type: providerType } = query;

  if (errorType === 'no_primary_email') {
    return (
      <PageLayout subtitle={`Error - 403 - ${errorType}`}>
        <ErrorNotification
          size="lg"
          title="Provider email is not visible"
          styles={`
            flex-direction: column;
            justify-content: center;
            align-items: center;
          `}
        >
          Your provider email is not visible. Please check your settings.
        </ErrorNotification>
      </PageLayout>
    );
  }

  if (errorType === 'access_denied') {
    return (
      <PageLayout subtitle={`Error - 403 - ${errorType}`}>
        <ErrorNotification
          size="lg"
          title="Ego requires access to your account"
          styles={`
            flex-direction: column;
            justify-content: center;
            align-items: center;
          `}
        >
          You have denied Ego access to your Identity Provider. Please allow access in order to log
          in to the DMS UI.
        </ErrorNotification>
      </PageLayout>
    );
  }

  return <div>There was a problem with your provider login.</div>;
};

export default Error403;
