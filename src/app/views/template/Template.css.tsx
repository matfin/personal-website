import styled, { css } from 'styled-components';

import { commonButtonStyle } from '@styles/common';
import { media } from '@styles/mixins';
import { animationCurve, boxShadow, layers } from '@styles/vars';
import MenuButton from '@components/menubutton';

interface ContainerProps {
  $navrevealed?: string;
}

interface AsideProps {
  $revealed: boolean;
}

interface MainProps {
  $nested: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  display: grid;
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  grid-template: 2rem auto 6rem / 1rem auto 1rem;
  grid-template-areas:
    '. . .'
    '. main .'
    '. . .';

  ${(props) =>
    props.$navrevealed &&
    css`
      overflow: hidden;
    `}

  ${media.md(css`
    grid-template: 2rem auto 12rem / 1rem auto 30rem 20rem auto;
    grid-template-areas:
      '. . . . .'
      '. . main side .'
      '. . footer side .';
  `)}

  ${media.lg(css`
    grid-template-columns: auto 40rem 20rem auto;
    grid-template-areas:
      '. . . .'
      '. main side .'
      '. footer side .';
  `)}
`;

export const Aside = styled.aside<AsideProps>`
  z-index: ${layers.upper};
  transform: translate3d(100vw, 0, 0);
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: ${(props) => props?.theme?.colours?.secondary};
  box-shadow: none;
  transition: transform 0.5s ${animationCurve};

  ${({ $revealed }) =>
    $revealed &&
    css`
      box-shadow: ${boxShadow};
      transform: translate3d(0, 0, 0);
    `}

  ${media.md(css`
    box-shadow: none;
    position: unset;
    width: unset;
    height: unset;
    grid-area: side;
    transform: unset;
    background: transparent;
  `)}
`;

export const Main = styled.main<MainProps>`
  position: relative;
  grid-area: main;
  border: 0.125rem solid ${(props) => props?.theme?.colours?.primary};
  padding: 0.75rem;
  transition: padding 0.25s ${animationCurve};

  ${media.md(css`
    padding: 1.75rem;
  `)}

  ${({ $nested }) =>
    $nested &&
    css`
      padding-top: 3rem;

      ${media.md(css`
        padding-top: 4rem;
      `)}
    `}
`;

export const MenuBurger = styled(MenuButton)`
  ${commonButtonStyle}

  z-index: ${layers.top};
  right: 1rem;

  ${media.md(css`
    display: none;
  `)}
`;
