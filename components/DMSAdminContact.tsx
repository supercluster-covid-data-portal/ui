import styled from '@emotion/styled';
import { getConfig } from '../global/config';
import StyledLink from './Link';

const Span = styled('span')`
  line-height: 24px;
`;

const DMSAdminContact = () => {
  const { NEXT_PUBLIC_ADMIN_EMAIL } = getConfig();
  const Component = NEXT_PUBLIC_ADMIN_EMAIL ? StyledLink : Span;
  return <Component href={`mailto:${NEXT_PUBLIC_ADMIN_EMAIL}`}>DMS administrator</Component>;
};

export const GenericHelpMessage = () => (
  <span>
    Please try again. If the problem persists, please contact the <DMSAdminContact /> for help
    troubleshooting the issue.
  </span>
);

export default DMSAdminContact;
