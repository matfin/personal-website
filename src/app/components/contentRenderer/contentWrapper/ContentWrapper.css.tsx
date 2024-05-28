import styled, { css } from 'styled-components';

import { animationCurve, boxShadow, colours, layers } from '@styles/vars';
import { listItemStyle, media } from '@styles/mixins';
import Text from '@components/text';
import Picture from '@components/contentRenderer/picture';
import Topic from '@components/contentRenderer/topic';
import InlineLink from '@components/contentRenderer/inlinelink';

export const List = styled.ul`
  list-style: none;
`;

export const ListItem = styled(Text)`
  ${listItemStyle}
`;

export const PhotoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

export const Photo = styled(Picture)`
  img {
    width: 15rem;
    height: 15rem;
    background-color: ${colours.primary};
    border-radius: 50%;
    border: 2px solid ${colours.tertiary};
    box-shadow: ${boxShadow};
    filter: brightness(${({ theme }) => theme.brightness});

    ${media.md(css`
      width: 20rem;
      height: 20rem;
    `)}
  }
`;

export const Topics = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.5rem;

  ${media.md(css`
    grid-template-columns: repeat(3, 1fr);
  `)}
`;

export const TopicItem = styled(Topic)`
  box-shadow: ${boxShadow};
`;

export const Projects = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;

  ${media.lg(css`
    grid-template-columns: repeat(2, 1fr);
  `)}
`;

export const ProjectTile = styled.li`
  background: ${({ theme }) => theme.colours.tertiary};
  padding: 1rem;
  box-shadow: ${boxShadow};
  transition: transform 200ms ${animationCurve};

  &:hover {
    transform: scale(1.02);
  }
`;

export const Link = styled(InlineLink)`
  position: relative;
  transition: color 200ms ${animationCurve};

  &::after {
    z-index: ${layers.lower};
    position: absolute;
    bottom: -0.125rem;
    left: 0;
    width: 100%;
    height: 0.125rem;
    background-color: ${({ theme }) => theme.colours.primary};
    content: '';
    transition: height 200ms ${animationCurve};
  }

  &:hover {
    color: ${({ theme }) => theme.colours.secondary};

    &::after {
      height: 100%;
    }
  }
`;
