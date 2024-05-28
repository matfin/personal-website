import styled from 'styled-components';

import { colours } from '@styles/vars';
import Text from '@components/text';

export const Container = styled(Text)`
  color: ${colours.primary};
  border-radius: 0.25rem;
  padding: 0.5rem;
  background: ${(props) => props?.theme?.colours?.tertiary};
  margin: 0;
`;
