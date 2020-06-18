import styled, { css } from 'styled-components';
import {
  animationCurve,
  layers,
  media,
  orientation,
} from 'app/styles';
import { Link } from 'react-router-dom';

interface ILinkStProps {
  isactive?: string
}

export const NavSt = styled.nav`
  display: grid;
  grid-template-columns: 2rem 1fr 2rem;
  grid-template-rows: repeat(5, 3rem);
  grid-row-gap: 2rem;
  margin-top: 4rem;

  ${orientation.landscape(css`
    grid-template-columns: 2rem 1fr 8rem;
    grid-template-rows: repeat(5, 2rem);
    grid-row-gap: 1rem;
    margin-top: 3.5rem;
  `)}

  ${media.md(css`
    grid-template-rows: repeat(5, 3rem);
    grid-row-gap: 2rem;
    margin-top: 0;
  `)}
`;

export const LinkSt = styled(Link)<ILinkStProps>`
  grid-column: 2 / 3;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  transition: all 200ms ${animationCurve};
  transition-property: color padding;

  ${media.md(css`
    grid-column: 1 / 4;
  `)}

  ${(linkProps) => linkProps.isactive === 'true' && css`
    color: ${(props) => props?.theme?.colours?.secondary};
  `}

  &::after {
    z-index: ${layers.lower};
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    background: ${(props) => props?.theme?.colours?.primary};
    transition: all 200ms ${animationCurve};
    transition-property: background height;
    content: "";

    ${(linkProps) => linkProps.isactive === 'true' && css`
      color: ${(props) => props?.theme?.colours?.secondary};
      height: 100%;
    `}
  }

  &:hover {
    color: ${(props) => props?.theme?.colours?.secondary};

    &::after {
      height: 100%;
      background: ${(props) => props?.theme?.colours?.primary};
    }
  }
`;

export const ChildrenSt = styled.div`
  grid-column: 2 / 3;
  display: flex;
  align-items: center;
  padding-left: 0.5rem;

  ${media.md(css`
    grid-column: 1 / 4;
  `)}
`;
