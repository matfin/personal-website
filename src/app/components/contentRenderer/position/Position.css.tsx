import styled from 'styled-components';

import { listItemStyle } from '@styles/mixins';
import Text from '@components/text';
import { fontWeight } from '@styles/vars';

export const Container = styled.div`
  margin: 1rem 0 2rem;
`;

export const CompanyName = styled(Text)`
  padding: 0;
`;

export const LocationAndRole = styled(Text)`
  margin-bottom: 1rem;
`;

export const DateFromTo = styled(Text)`
  font-weight: ${fontWeight.bold};
`;

export const TaskList = styled.ul`
  display: block;
`;

export const TaskItem = styled(Text)`
  ${listItemStyle}
  margin: 0;
`;
