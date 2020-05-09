import styled from 'styled-components';
import {
  listItemStyle,
  subHeadingTypography,
  textTypography,
  thirdHeadingTypography,
} from 'app/styles';

export const PositionSt = styled.div`
  margin: 1rem 0 2rem;
`;

export const CompanyNameSt = styled.h3`
  ${subHeadingTypography};
`;

export const LocationAndRoleSt = styled.h4`
  ${thirdHeadingTypography};
  margin-bottom: 1rem;
`;

export const DateFromToSt = styled.h4`
  ${thirdHeadingTypography};
`;

export const TaskListSt = styled.ul`
  display: block;
`;

export const TaskItemSt = styled.li`
  ${listItemStyle};
  ${textTypography};
`;
