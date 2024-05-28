import styled from 'styled-components';
import { colours } from '@styles/vars';
import { textTypography } from '@styles/typography';

export const Container = styled.li`
  ${textTypography}

  color: ${colours.primary};
  border-radius: 0.25rem;
  padding: 0.5rem;
  background: ${(props) => props?.theme?.colours?.tertiary};
`;
