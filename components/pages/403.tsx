import React from 'react';

import ErrorNotification from '../ErrorNotification';
import PageLayout from '../PageLayout';

const errorSubtitles: { [k in string]: string } = {
  no_primary_email: 'No Primary Email',
  access_denied: 'Access Denied',
};

const Error403 = ({ query }: { query: any }) => {
  const { error_type: errorType, provider_type: providerType } = query;

  switch (errorType) {
    case 'no_primary_email':
      return (
        <PageLayout subtitle={`Error - 403 - ${errorSubtitles[errorType]}`}>
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
    case 'access_denied':
      return (
        <PageLayout subtitle={`Error - 403 - ${errorSubtitles[errorType]}`}>
          <ErrorNotification
            size="lg"
            title="Ego requires access to your account"
            styles={`
              flex-direction: column;
              justify-content: center;
              align-items: center;
            `}
          >
            You have denied Ego access to your Identity Provider. Please allow access in order to
            log in to the DMS UI.
          </ErrorNotification>
        </PageLayout>
      );
    default:
      return (
        <PageLayout subtitle="Error - 403">
          <ErrorNotification
            size="lg"
            title="Forbidden"
            styles={`
                flex-direction: column;
                justify-content: center;
                align-items: center;
              `}
          >
            You do not have access to this page.
          </ErrorNotification>
        </PageLayout>
      );
  }
};

export default Error403;
