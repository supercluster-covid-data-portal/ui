import React from 'react';
import DMSAdminContact from './DMSAdminContact';
import { ErrorPageLayout } from './PageLayout';

const ClientError = () => {
  return (
    <ErrorPageLayout errorTitle="Oops! Something went wrong" subtitle="Oops! Something went wrong">
      An unknown error has occurred. If the problem persists, contact the <DMSAdminContact /> for
      help.
    </ErrorPageLayout>
  );
};

export default ClientError;
