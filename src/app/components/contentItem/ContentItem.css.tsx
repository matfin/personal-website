import styled, { css } from 'styled-components';
import {
  animationCurve,
  boxShadow,
  colours,
  headingTypography,
  layers,
  listItemStyle,
  media,
  subHeadingTypography,
  textTypography,
} from 'app/styles';
import InlineLink from 'app/components/inlinelink/InlineLink';
import Picture from 'app/components/picture/Picture';
import Project from 'app/components/project/Project';
import Topic from 'app/components/topic/Topic';

export const SectionSt = styled.section`
  display: block;
`;

export const HeadingSt = styled.h1`
  ${headingTypography}
  padding-right: 3rem;
`;

export const SubHeadingSt = styled.h2`
  ${subHeadingTypography}
  padding: 1rem 0;
`;

export const ParagraphSt = styled.p`
  ${textTypography}
  margin: 1rem 0;
`;

export const ImageContainerSt = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

export const TopicSt = styled(Topic)`
  box-shadow: ${boxShadow};
`;

export const PictureSt = styled(Picture)`
  img {
    width: 15rem;
    height: 15rem;
    background-color: ${colours.primary};
    border-radius: 50%;
    border: 2px solid ${colours.tertiary};
    box-shadow: ${boxShadow};
    filter: brightness(${(props) => props?.theme?.brightness});

    ${media.md(css`
      width: 20rem;
      height: 20rem;
    `)}
  }
`;

export const ListSt = styled.ul`
  list-style: none;
`;

export const ProjectSt = styled(Project)`
  height: 100%;
`;

export const TiledListSt = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;

  ${media.lg(css`
    grid-template-columns: repeat(2, 1fr);
  `)}
`;

export const TileSt = styled.li`
  background: ${(props) => props?.theme?.colours?.tertiary};
  padding: 1rem;
  box-shadow: ${boxShadow};
  transition: transform 200ms ${animationCurve};

  &:hover {
    transform: scale(1.02);
  }
`;

export const ListItemSt = styled.li`
  ${listItemStyle}
  ${textTypography}
`;

export const TopicsSt = styled.ul`
  list-style: none;
  display: grid;

  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.5rem;

  ${media.md(css`
    grid-template-columns: repeat(3, 1fr);
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
    background-color: ${(props) => props?.theme?.colours?.primary};
    content: '';
    transition: height 200ms ${animationCurve};
  }

  &:hover {
    color: ${(props) => props?.theme?.colours?.secondary};

    &::after {
      height: 100%;
    }
  }
`;
