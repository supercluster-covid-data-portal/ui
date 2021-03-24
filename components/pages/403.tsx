import React from 'react';

import { ErrorPageLayout } from '../PageLayout';

enum EgoLoginError {
  NO_PRIMARY_EMAIL = 'no_primary_email',
  ACCESS_DENIED = 'access_denied',
}

const errorSubtitles: { [k in EgoLoginError]: string } = {
  no_primary_email: 'No Primary Email',
  access_denied: 'Access Denied',
};

const Error403 = ({ query }: { query: { error_type: EgoLoginError; provider_type?: string } }) => {
  const { error_type: errorType, provider_type: providerType } = query;

  switch (errorType) {
    case EgoLoginError.NO_PRIMARY_EMAIL:
      return (
        <ErrorPageLayout
          subtitle={`Error - 403 - ${errorSubtitles[errorType]}`}
          errorTitle="Provider email is not visible"
        >
          Your provider email is not visible. Please check your settings.
        </ErrorPageLayout>
      );
    case EgoLoginError.ACCESS_DENIED:
      return (
        <ErrorPageLayout
          subtitle={`Error - 403 - ${errorSubtitles[errorType]}`}
          errorTitle="Ego requires access to your account"
        >
          You have denied Ego access to your Identity Provider. Please allow access in order to log
          in to the DMS UI.
        </ErrorPageLayout>
      );
    default:
      return (
        <ErrorPageLayout subtitle="Error - 403" errorTitle="Forbidden">
          You do not have access to this page.
        </ErrorPageLayout>
      );
  }
};

export default Error403;
