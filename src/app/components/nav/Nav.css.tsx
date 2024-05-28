import styled, { css } from 'styled-components';
import { Link as RRDLink } from 'react-router-dom';

import { media } from '@styles/mixins';
import { orientation } from '@styles/mixins';
import { animationCurve, layers } from '@styles/vars';

export const Container = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(5, 3rem);
  grid-row-gap: 2rem;
  margin-top: 4.75rem;

  ${orientation.landscape(css`
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

export const Link = styled(RRDLink)`
  grid-column: 2;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  transition: color 200ms ${animationCurve};

  &::before,
  &::after {
    z-index: ${layers.lower};
    position: absolute;
    top: 0;
    content: '';
    background: ${(props) => props?.theme?.colours?.primary};
    transition: width 350ms ${animationCurve};
  }

  &::before {
    top: 100%;
    right: 0;
    width: 0;
    height: 0.125rem;
  }

  &::after {
    right: 0;
    width: 0;
    height: 100%;
  }

  &.active {
    color: ${(props) => props?.theme?.colours?.secondary};

    &::before {
      width: 200%;
      left: -100%;
    }

    &::after {
      width: 100%;
    }
  }
`;

export const Children = styled.div`
  grid-column: 2;
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
`;
