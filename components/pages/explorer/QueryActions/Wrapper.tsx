import styled from '@emotion/styled';

const StyledActionsSection = styled('section')`
  align-items: center;
  border-left: 1px solid #ddd;
  display: flex;
  margin: 10px 0;
  padding: 0 15px;

  > *:not(:first-child) {
    margin-left: 10px;
  }

  button {
    height: 25px;
  }
`;

export default StyledActionsSection;
