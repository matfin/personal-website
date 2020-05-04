import styled, { css } from 'styled-components';
import {
  fontSizes,
  letterSpacing,
  lineHeight,
} from 'app/styles';
import { Position } from 'app/components/position/Position';
import { Project } from 'app/components/project/Project';
import { Topic } from 'app/components/topic/Topic';

const defaultText = css`
  font-size: ${fontSizes.text}px;
  letter-spacing: ${letterSpacing.text}px;
  line-height: ${lineHeight.text}px;
`;

export const SectionSt = styled.section`
  display: block;
`;

export const HeadingSt = styled.h1`
  font-size: ${fontSizes.heading}px;
  letter-spacing: ${letterSpacing.heading}px;
  line-height: ${lineHeight.heading}px;
`;

export const SubHeadingSt = styled.h2`
  font-size: ${fontSizes.subheading}px;
  letter-spacing: ${letterSpacing.subheading}px;
  line-height: ${lineHeight.subheading}px;
`;

export const ParagraphSt = styled.p`
  ${defaultText};
`;

export const ListItemSt = styled.li`
  ${defaultText};
`;

export const ListSt = styled.ul`
  list-style: none;
`;

export const TopicSt = styled(Topic)`
  background-color: red;
`;

export const PositionSt = styled(Position)`
  background-color: green;
`;

export const ProjectSt = styled(Project)`
  background-color: blue;
`;

