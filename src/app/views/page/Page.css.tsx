import styled, { css } from 'styled-components';
import { animationCurve, boxShadow, layers, media } from 'app/styles';
import { Footer } from 'app/components/footer/Footer';
import { Loading } from 'app/components/loading/Loading';
import { MenuButton } from 'app/components/menubutton/MenuButton';

interface ISideStProps {
  revealed: boolean;
}

interface IPageStProps {
  navRevealed: boolean;
}

export const PageSt = styled.div<IPageStProps>`
  position: relative;
  display: grid;
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;

  grid-template-columns: 1rem auto 1rem;
  grid-template-rows: 2rem auto 6rem;
  grid-template-areas:
    ". . ."
    ". main ."
    ". footer .";

  ${(props) =>
    props.navRevealed &&
    css`
      overflow: hidden;
    `}

  ${media.md(css`
    grid-template-columns: auto 30rem auto 10rem auto;
    grid-template-rows: 2rem auto 12rem;
    grid-template-areas:
      '. . . . .'
      '. main . side .'
      '. footer . side .';
  `)}

  ${media.lg(css`
    grid-template-columns: auto 40rem auto 10rem auto;
  `)}
`;

export const MainSt = styled.main`
  grid-area: main;
`;

export const SideSt = styled.aside<ISideStProps>`
  z-index: ${layers.upper};
  transform: translate3d(100vw, 0, 0);
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: ${(props) => props?.theme?.colours?.secondary};
  box-shadow: none;
  transition: transform 0.5s ${animationCurve};

  ${({ revealed }) =>
    revealed &&
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

export const FooterSt = styled(Footer)`
  grid-area: footer;
`;

export const BurgerSt = styled(MenuButton)`
  z-index: ${layers.top};
  position: fixed;
  top: 0.5rem;
  right: 1rem;
  width: 3rem;
  height: 3rem;

  ${media.md(css`
    display: none;
  `)}
`;

export const ErrorSt = styled.div`
  grid-area: main;
`;

export const LoadingSt = styled(Loading)`
  grid-area: main;
`;
