import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colours } from '@styles/vars';
import Text from '@components/text';

export const Container = styled(Link)`
  position: relative;
  display: block;
  color: ${colours.primary};
`;

export const Description = styled(Text)`
  margin: 0;
`;

export const Title = styled(Text)`
  margin: 0 0 0.5rem;
  padding: 0;
`;
