import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import {
  animationCurve,
  boxShadow,
  layers,
  media,
  textTypography,
} from 'app/styles';
import { Footer } from 'app/components/footer/Footer';
import { Loading } from 'app/components/loading/Loading';
import { MenuButton } from 'app/components/menubutton/MenuButton';

interface ISideStProps {
  revealed: boolean;
}

interface IMainStProps {
  nested: boolean;
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
    grid-template-columns: 1rem auto 30rem 20rem auto;
    grid-template-rows: 2rem auto 12rem;
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

export const MainSt = styled.main<IMainStProps>`
  position: relative;
  grid-area: main;
  border: 0.125rem solid ${(props) => props?.theme?.colours?.primary};
  padding: 0.75rem;

  ${media.md(css`
    padding: 1.75rem;
  `)}

  ${({ nested }) =>
    nested &&
    css`
      padding-top: 3rem;

      ${media.md(css`
        padding-top: 4rem;
      `)}
    `}
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

const commonButtonStyle = css`
  position: fixed;
  top: 1rem;
  width: 3.5rem;
  height: 3.5rem;
  border: 0.125rem solid ${(props) => props?.theme?.colours?.primary};
`;

export const BurgerSt = styled(MenuButton)`
  ${commonButtonStyle}
  z-index: ${layers.top};
  right: 1rem;

  ${media.md(css`
    display: none;
  `)}
`;

export const BackSt = styled(Link)`
  ${commonButtonStyle}
  left: 1rem;
  background: ${(props) => props?.theme?.colours?.secondary};
  ${textTypography}

  ${media.md(css`
    position: absolute;
    top: -1.25rem;
    left: -0.125rem;
  `)}

  &::before {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    content: '<';
    font-size: 1.5rem;
  }
`;

export const ErrorSt = styled.div`
  grid-area: main;
`;

export const LoadingSt = styled(Loading)`
  grid-area: main;
`;
