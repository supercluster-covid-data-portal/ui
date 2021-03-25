import React from 'react';
import DMSAdminContact from '../DMSAdminContact';
import { ErrorPageLayout } from '../PageLayout';

const Error500 = () => {
  return (
    <ErrorPageLayout errorTitle="500: Server Error" subtitle="Error 500 - Server Error">
      The page you requested could not be accessed due to a server error. If the problem persists,
      please contact the <DMSAdminContact /> for help.
    </ErrorPageLayout>
  );
};

export default Error500;
