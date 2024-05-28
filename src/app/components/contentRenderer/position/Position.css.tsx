import styled from 'styled-components';
import { listItemStyle } from '@styles/mixins';
import { fontWeight } from '@styles/vars';
import {
  subHeadingTypography,
  textTypography,
  thirdHeadingTypography,
} from '@styles/typography';

export const Container = styled.div`
  margin: 1rem 0 2rem;
`;

export const CompanyName = styled.h3`
  ${subHeadingTypography}
`;

export const LocationAndRole = styled.h4`
  ${thirdHeadingTypography}

  margin-bottom: 1rem;
`;

export const DateFromTo = styled.h4`
  ${thirdHeadingTypography}

  font-weight: ${fontWeight.bold};
`;

export const TaskList = styled.ul`
  display: block;
`;

export const TaskItem = styled.li`
  ${listItemStyle}
  ${textTypography}
`;
