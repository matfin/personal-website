import styled, { css } from 'styled-components';
import { animationCurve, layers, media, orientation } from 'app/styles';
import { NavLink } from 'react-router-dom';

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

export const LinkSt = styled(NavLink)`
  grid-column: 2 / 3;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  transition: color 200ms ${animationCurve};

  ${media.md(css`
    grid-column: 1 / 4;
  `)}

  &::after {
    z-index: ${layers.lower};
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 100%;
    background: ${(props) => props?.theme?.colours?.primary};
    transition: width 200ms ${animationCurve};
    content: '';
  }

  &.active {
    color: ${(props) => props?.theme?.colours?.secondary};

    &::after {
      width: 100%;
    }
  }

  &:hover {
    &::after {
      width: 1rem;
    }

    &.active {
      &::after {
        width: 100%;
      }
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
