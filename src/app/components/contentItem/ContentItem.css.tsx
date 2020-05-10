import styled, { css } from 'styled-components';
import {
  headingTypography,
  listItemStyle,
  media,
  subHeadingTypography,
  textTypography,
} from 'app/styles';
import { Topic } from 'app/components/topic/Topic';

export const SectionSt = styled.section`
  display: block;
`;

export const HeadingSt = styled.h1`
  ${headingTypography};
`;

export const SubHeadingSt = styled.h2`
  ${subHeadingTypography};
  padding: 1rem 0;
`;

export const ParagraphSt = styled.p`
  ${textTypography};
  margin: 1rem 0;
`;

export const ListSt = styled.ul`
  list-style: none;
`;

export const ListItemSt = styled.li`
  ${listItemStyle};
  ${textTypography};
`;

export const TopicSt = styled(Topic)`
  display: inline-block;
  margin: 0.125rem;

  ${media.md(css`
    margin: 0.25rem;
  `)}
`;
