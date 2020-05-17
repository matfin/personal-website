import styled, { css } from 'styled-components';
import {
  animationCurve,
  boxShadow,
  colours,
  layers,
  media
} from 'app/styles';
import { Footer } from 'app/components/footer/Footer';
import { MenuButton } from 'app/components/menubutton/MenuButton';

interface ISideStProps {
  revealed: boolean,
}

interface IPageStProps {
  navRevealed: boolean
}

export const PageSt = styled.div<IPageStProps>`
  position: relative;
  display: grid;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;

  grid-template-columns: 1rem auto 1rem;
  grid-template-rows: auto;
  grid-template-areas:
    ". main .";

  ${(props) => props.navRevealed && css`
    overflow: hidden;
  `};

  ${media.md(css`
    grid-template-columns: auto 30rem 2rem 12.25rem auto;
    grid-template-areas:
      ". main . side .";
  `)};

  ${media.lg(css`
    grid-template-columns: auto 40rem 4rem 12.25rem auto;
  `)};
`;

export const MainSt = styled.main`
  grid-area: main;
`;

export const SideSt = styled.aside<ISideStProps>`
  z-index: ${layers.upper};
  transform: translate3d(100vw, 0, 0);
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${colours.secondary};
  box-shadow: none;
  transition: transform 0.5s ${animationCurve};

  ${({ revealed }) => revealed && css`
    box-shadow: ${boxShadow};
    transform: translate3d(0, 0, 0);
  `};

  ${media.md(css`
    box-shadow: none;
    position: unset;
    width: unset;
    height: unset;
    grid-area: side;
    transform: unset;
    background: transparent;
  `)};
`;

export const SideContainerSt = styled.div`
  padding: 3rem 4rem;

  ${media.md(css`
    padding: 0 2rem;
    position: sticky;
    top: 0;
    left: 0;
  `)};
`;

export const FooterSt = styled(Footer)`
  display: none;
`;

export const BurgerSt = styled(MenuButton)`
  z-index: ${layers.top};
  position: fixed;
  top: 1rem;
  right: 1rem;
  width: 3rem;
  height: 3rem;

  ${media.md(css`
    display: none;
  `)};
`;

export const ErrorSt = styled.div`
`;

export const LoadingSt = styled.div`
`;


