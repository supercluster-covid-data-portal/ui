import styled from '@emotion/styled';
import Color from 'color';

import { DefaultThemeObject } from '@/components/theme';

const ModalOverlay = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }: DefaultThemeObject) =>
    Color(theme.colors.grey_5).alpha(0.7).hsl().string()};
`;

const Overlay = (props: any) => <ModalOverlay {...props} />;

export default Overlay;
