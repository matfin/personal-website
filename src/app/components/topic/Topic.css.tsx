import styled from 'styled-components';
import { colours, textTypography } from 'app/styles';

export const TopicSt = styled.li`
  ${textTypography}
  color: ${colours.primary};
  border-radius: 0.25rem;
  padding: 0.5rem;
  background: ${(props) => props?.theme?.colours?.tertiary};
`;

export default TopicSt;
