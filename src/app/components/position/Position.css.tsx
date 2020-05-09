import styled from 'styled-components';
import {
  colours,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
} from 'app/styles';
import { Topic } from 'app/components/topic/Topic';

export const PositionSt = styled.div`
  display: block;
`;

export const CompanyNameSt = styled.h3`
  font-weight: ${fontWeight.bold};
`;

export const LocationAndRoleSt = styled.h4`
  font-weight: ${fontWeight.bold};
`;

export const DateSt = styled.time`
  font-weight: bold;
`;

export const TaskListSt = styled.ul`
  display: block;
`;

export const TopicsListSt = styled.ul`
  display: block;
`;

export const TaskItemSt = styled.li`
  border: 1px solid ${colours.tertiary};
`;

export const TopicSt = styled(Topic)`
  background-color: pink;
`;
