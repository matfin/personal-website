import styled, { css } from 'styled-components';
import {
  animationCurve,
  colours,
  headingTypography,
  layers,
  listItemStyle,
  media,
  subHeadingTypography,
  textTypography,
} from 'app/styles';
import { InlineLink } from 'app/components/inlinelink/InlineLink';
import { Topic } from 'app/components/topic/Topic';

export const SectionSt = styled.section`
  display: block;
`;

export const HeadingSt = styled.h1`
  ${headingTypography};
  padding-right: 3rem;
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

export const LinkSt = styled(InlineLink)`
  position: relative;
  transition: color 200ms ${animationCurve};

  &::after {
    z-index: ${layers.lower};
    position: absolute;
    bottom: -0.125rem;
    left: 0;
    width: 100%;
    height: 0.125rem;
    background-color: ${props => props?.theme?.colours?.primary};
    content: "";
    transition: height 200ms ${animationCurve};
  }

  &:hover {
    color: ${props => props?.theme?.colours?.secondary};

    &::after {
      height: 100%;
    }
  }
`;
