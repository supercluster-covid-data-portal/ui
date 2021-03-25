import React from 'react';
import DMSAdminContact from '../DMSAdminContact';
import { ErrorPageLayout } from '../PageLayout';

const Error404 = () => {
  return (
    <ErrorPageLayout errorTitle="404: Page not found" subtitle="Error 404 - Page not found">
      The page you requested could not be found. Please check that you have entered the correct URL.
      If the problem persists, contact the <DMSAdminContact /> for help.
    </ErrorPageLayout>
  );
};

export default Error404;
